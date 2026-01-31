/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    User as UserIcon,
    MapPin,
    Phone,
    Mail,
    CheckCircle,
    Loader2,
    LayoutDashboard,
    ShieldCheck,
    Building2,
    Users,
    Instagram,
    Facebook,
    Globe,
    Twitter,
    Linkedin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useGetProfileQuery, useUpdateProfileMutation } from "./ProfileAPIS";
import { Country, State, City } from "country-state-city";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";


const ROLES_INFO = {
    USER: {
        label: "Individual User",
        dashboard: "/Tree/Free_clam_tree",
        icon: Users,
        color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    NGO: {
        label: "NGO Partner",
        dashboard: "/NGO/Dashboard",
        icon: ShieldCheck,
        color: "text-green-600 bg-green-50 border-green-100",
    },
    CORPORATE: {
        label: "Corporate Partner",
        dashboard: "/Corporate/Dashboard",
        icon: Building2,
        color: "text-purple-600 bg-purple-50 border-purple-100",
    },
};

export default function ProfilePage() {
    const { status } = useSession();
    const router = useRouter();

    // RTK Query hooks
    const { data: serverData, isLoading: isFetching, refetch } = useGetProfileQuery(undefined, {
        skip: status !== "authenticated",
    });
    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        role: "USER",
        image: "",
        referredUsers: 0,
    });

    const [profileData, setProfileData] = useState({
        bio: "",
        phoneNumber: "",
        address: {
            street: "",
            city: "",
            state: "",
            zip: "",
            country: "",
        },
        socialLinks: {
            website: "",
            twitter: "",
            linkedin: "",
            instagram: "",
            facebook: "",
        },
        roleSpecificData: {
            ngoName: "",
            registrationNumber: "",
            missionStatement: "",
            areasOfOperation: [] as string[],
            certificateUrl: "",
            companyName: "",
            industry: "",
            csrFocus: "",
            sustainabilityGoals: "",
        },
    });

    const [locationSelection, setLocationSelection] = useState({
        countryCode: "",
        stateCode: "",
        city: "",
    });


    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    // Update local state when server data is loaded
    useEffect(() => {
        if (serverData) {
            if (serverData.user) {
                setUserData({
                    firstName: serverData.user.firstName || "",
                    lastName: serverData.user.lastName || "",
                    email: serverData.user.email || "",
                    role: serverData.user.role || "USER",
                    image: serverData.user.image || "",
                    referredUsers: serverData.user.referredUsers || 0,
                });
            }
            if (serverData.profile) {
                setProfileData({
                    bio: serverData.profile.bio || "",
                    phoneNumber: serverData.profile.phoneNumber || "",
                    address: {
                        street: serverData.profile.address?.street || "",
                        city: serverData.profile.address?.city || "",
                        state: serverData.profile.address?.state || "",
                        zip: serverData.profile.address?.zip || "",
                        country: serverData.profile.address?.country || "",
                    },
                    socialLinks: {
                        website: serverData.profile.socialLinks?.website || "",
                        twitter: serverData.profile.socialLinks?.twitter || "",
                        linkedin: serverData.profile.socialLinks?.linkedin || "",
                        instagram: serverData.profile.socialLinks?.instagram || "",
                        facebook: serverData.profile.socialLinks?.facebook || "",
                    },
                    roleSpecificData: {
                        ngoName: serverData.profile.roleSpecificData?.ngoName || "",
                        registrationNumber: serverData.profile.roleSpecificData?.registrationNumber || "",
                        missionStatement: serverData.profile.roleSpecificData?.missionStatement || "",
                        areasOfOperation: serverData.profile.roleSpecificData?.areasOfOperation || [],
                        certificateUrl: serverData.profile.roleSpecificData?.certificateUrl || "",
                        companyName: serverData.profile.roleSpecificData?.companyName || "",
                        industry: serverData.profile.roleSpecificData?.industry || "",
                        csrFocus: serverData.profile.roleSpecificData?.csrFocus || "",
                        sustainabilityGoals: serverData.profile.roleSpecificData?.sustainabilityGoals || "",
                    },
                });
            }
        }
    }, [serverData]);

    const calculateCompletion = () => {
        let totalPoints = 0;
        let earnedPoints = 0;

        // Basic Info (40 points total)
        const basicFields = [
            { val: userData.firstName, weight: 10 },
            { val: userData.lastName, weight: 10 },
            { val: userData.email, weight: 10 },
            { val: userData.image, weight: 10 },
        ];
        basicFields.forEach(f => {
            totalPoints += f.weight;
            if (f.val) earnedPoints += f.weight;
        });

        // Profile Details (30 points total)
        const profileFields = [
            { val: profileData.bio, weight: 10 },
            { val: profileData.phoneNumber, weight: 10 },
            { val: profileData.address.city, weight: 10 },
        ];
        profileFields.forEach(f => {
            totalPoints += f.weight;
            if (f.val) earnedPoints += f.weight;
        });

        // Social Links (10 points total)
        const socialFields = Object.values(profileData.socialLinks);
        totalPoints += 10;
        if (socialFields.some(val => val)) earnedPoints += 10;

        // Role Specific (20 points total)
        if (userData.role === "NGO") {
            const ngoFields = [
                { val: profileData.roleSpecificData.ngoName, weight: 5 },
                { val: profileData.roleSpecificData.registrationNumber, weight: 5 },
                { val: profileData.roleSpecificData.missionStatement, weight: 5 },
                { val: profileData.roleSpecificData.areasOfOperation.length > 0, weight: 5 },
            ];
            ngoFields.forEach(f => {
                totalPoints += f.weight;
                if (f.val) earnedPoints += f.weight;
            });
        } else if (userData.role === "CORPORATE") {
            const corpFields = [
                { val: profileData.roleSpecificData.companyName, weight: 5 },
                { val: profileData.roleSpecificData.industry, weight: 5 },
                { val: profileData.roleSpecificData.csrFocus, weight: 5 },
                { val: profileData.roleSpecificData.sustainabilityGoals, weight: 5 },
            ];
            corpFields.forEach(f => {
                totalPoints += f.weight;
                if (f.val) earnedPoints += f.weight;
            });
        }

        return Math.round((earnedPoints / totalPoints) * 100);
    };

    const completionPercentage = calculateCompletion();

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await updateProfile({
                user: { firstName: userData.firstName, lastName: userData.lastName },
                profile: profileData,
            }).unwrap();

            if (result.success) {
                toast.success("Profile updated successfully");
            } else {
                toast.error(result.error || "Update failed");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("An error occurred during update");
        }
    };

    if (isFetching || status === "loading") {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    const roleInfo = ROLES_INFO[userData.role as keyof typeof ROLES_INFO] || ROLES_INFO.USER;
    const RoleIcon = roleInfo.icon;

    return (
        <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            {/* Header Profile Section */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 mb-8">
                <div className="h-32 bg-gradient-to-r from-green-400 to-blue-500" />
                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-12">
                        <div className="relative">
                            <img
                                src={userData.image || "/img/default-avatar.png"}
                                alt="Avatar"
                                className="w-24 h-24 rounded-2xl border-4 border-white object-cover bg-white shadow-lg"
                            />
                            <div className="absolute -bottom-2 -right-2 p-1.5 bg-green-500 rounded-lg border-2 border-white">
                                <CheckCircle className="w-4 h-4 text-white" />
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                            <div className="w-48 space-y-1.5">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-wider text-gray-500">
                                    <span>Profile Completion</span>
                                    <span className="text-green-600">{completionPercentage}%</span>
                                </div>
                                <Progress value={completionPercentage} className="h-2 bg-green-50" />
                            </div>
                            <Button
                                onClick={() => router.push(roleInfo.dashboard)}
                                className="rounded-xl shadow-md flex items-center gap-2 font-bold"
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                Go to Dashboard
                            </Button>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="flex-1">
                            <h1 className="text-3xl font-black text-gray-900 leading-tight">
                                {userData.firstName} {userData.lastName}
                            </h1>
                            {(profileData.roleSpecificData.ngoName || profileData.roleSpecificData.companyName) && (
                                <p className="text-lg font-bold text-green-700 -mt-1">
                                    {profileData.roleSpecificData.ngoName || profileData.roleSpecificData.companyName}
                                </p>
                            )}
                            <div className="flex flex-wrap items-center gap-4 text-gray-500 mt-2">
                                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                    <Mail className="w-4 h-4 text-green-600" />
                                    <span className="text-sm font-semibold">{userData.email}</span>
                                </div>
                                {profileData.address.city && (
                                    <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                        <MapPin className="w-4 h-4 text-orange-500" />
                                        <span className="text-sm font-semibold">{profileData.address.city}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                    <Users className="w-4 h-4 text-blue-500" />
                                    <span className="text-sm font-semibold">{userData.referredUsers} Referrals</span>
                                </div>
                            </div>
                            {profileData.bio && (
                                <p className="mt-4 text-gray-600 leading-relaxed text-sm font-medium bg-green-50/30 p-4 rounded-2xl border border-green-100/50 italic">
                                    &quot;{profileData.bio}&quot;
                                </p>
                            )}
                        </div>

                        <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl border shadow-sm ${roleInfo.color}`}>
                            <RoleIcon className="w-6 h-6" />
                            <div>
                                <p className="text-[10px] uppercase font-black opacity-60 leading-none mb-1">Account Type</p>
                                <p className="font-black text-sm tracking-tight">{roleInfo.label}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <form onSubmit={handleUpdate} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* General Information */}
                    <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold flex items-center gap-2 mb-2">
                            <UserIcon className="w-5 h-5 text-gray-400" />
                            Account Info
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">First Name</label>
                                <Input
                                    value={userData.firstName}
                                    onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                                    className="rounded-xl"
                                    placeholder="John"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Last Name</label>
                                <Input
                                    value={userData.lastName}
                                    onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                                    className="rounded-xl"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Bio</label>
                            <Textarea
                                value={profileData.bio}
                                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                className="rounded-xl min-h-[100px]"
                                placeholder="Tell us about your environmental mission..."
                            />
                        </div>
                    </section>

                    {/* Contact Details */}
                    <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold flex items-center gap-2 mb-2">
                            <Phone className="w-5 h-5 text-gray-400" />
                            Contact Details
                        </h2>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Phone Number</label>
                            <Input
                                value={profileData.phoneNumber}
                                onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
                                className="rounded-xl"
                                placeholder="+1 234 567 890"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Location</label>
                            <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl">
                                <MapPin className="ml-2 w-4 h-4 text-gray-400" />
                                <Input
                                    value={profileData.address.city}
                                    onChange={(e) => setProfileData({ ...profileData, address: { ...profileData.address, city: e.target.value } })}
                                    className="border-none bg-transparent shadow-none"
                                    placeholder="City, Country"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Website</label>
                                <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl">
                                    <Globe className="ml-2 w-4 h-4 text-gray-400" />
                                    <Input
                                        value={profileData.socialLinks.website}
                                        onChange={(e) => setProfileData({ ...profileData, socialLinks: { ...profileData.socialLinks, website: e.target.value } })}
                                        className="border-none bg-transparent shadow-none"
                                        placeholder="https://example.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Twitter</label>
                                <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl">
                                    <Twitter className="ml-2 w-4 h-4 text-gray-400" />
                                    <Input
                                        value={profileData.socialLinks.twitter}
                                        onChange={(e) => setProfileData({ ...profileData, socialLinks: { ...profileData.socialLinks, twitter: e.target.value } })}
                                        className="border-none bg-transparent shadow-none"
                                        placeholder="Twitter URL"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">LinkedIn</label>
                                <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl">
                                    <Linkedin className="ml-2 w-4 h-4 text-gray-400" />
                                    <Input
                                        value={profileData.socialLinks.linkedin}
                                        onChange={(e) => setProfileData({ ...profileData, socialLinks: { ...profileData.socialLinks, linkedin: e.target.value } })}
                                        className="border-none bg-transparent shadow-none"
                                        placeholder="LinkedIn URL"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Instagram</label>
                                <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl">
                                    <Instagram className="ml-2 w-4 h-4 text-gray-400" />
                                    <Input
                                        value={profileData.socialLinks.instagram}
                                        onChange={(e) => setProfileData({ ...profileData, socialLinks: { ...profileData.socialLinks, instagram: e.target.value } })}
                                        className="border-none bg-transparent shadow-none"
                                        placeholder="Instagram URL"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Facebook</label>
                                <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl">
                                    <Facebook className="ml-2 w-4 h-4 text-gray-400" />
                                    <Input
                                        value={profileData.socialLinks.facebook}
                                        onChange={(e) => setProfileData({ ...profileData, socialLinks: { ...profileData.socialLinks, facebook: e.target.value } })}
                                        className="border-none bg-transparent shadow-none"
                                        placeholder="Facebook URL"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Role Specific Sections */}
                {userData.role === "NGO" && (
                    <section className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold flex items-center gap-2 mb-2 text-blue-600">
                            <ShieldCheck className="w-5 h-5" />
                            NGO Verification & Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">NGO Legal Name</label>
                                <Input
                                    value={profileData.roleSpecificData.ngoName}
                                    onChange={(e) => setProfileData({
                                        ...profileData,
                                        roleSpecificData: { ...profileData.roleSpecificData, ngoName: e.target.value }
                                    })}
                                    className="rounded-xl"
                                    placeholder="Eco Guardians Foundation"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Registration Number</label>
                                <Input
                                    value={profileData.roleSpecificData.registrationNumber}
                                    onChange={(e) => setProfileData({
                                        ...profileData,
                                        roleSpecificData: { ...profileData.roleSpecificData, registrationNumber: e.target.value }
                                    })}
                                    className="rounded-xl"
                                    placeholder="NGO-12345-6789"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Mission Statement</label>
                            <Textarea
                                value={profileData.roleSpecificData.missionStatement}
                                onChange={(e) => setProfileData({
                                    ...profileData,
                                    roleSpecificData: { ...profileData.roleSpecificData, missionStatement: e.target.value }
                                })}
                                className="rounded-xl min-h-[80px]"
                                placeholder="Describe your organization's core mission..."
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Areas of Operation</label>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                <Select
                                    value={locationSelection.countryCode}
                                    onValueChange={(val) => setLocationSelection({ countryCode: val, stateCode: "", city: "" })}
                                >
                                    <SelectTrigger className="rounded-xl">
                                        <SelectValue placeholder="Select Country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Country.getAllCountries().map((c) => (
                                            <SelectItem key={c.isoCode} value={c.isoCode}>
                                                {c.flag} {c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={locationSelection.stateCode}
                                    onValueChange={(val) => setLocationSelection({ ...locationSelection, stateCode: val, city: "" })}
                                    disabled={!locationSelection.countryCode}
                                >
                                    <SelectTrigger className="rounded-xl">
                                        <SelectValue placeholder="Select State (Optional)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {State.getStatesOfCountry(locationSelection.countryCode).map((s) => (
                                            <SelectItem key={s.isoCode} value={s.isoCode}>
                                                {s.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={locationSelection.city}
                                    onValueChange={(val) => setLocationSelection({ ...locationSelection, city: val })}
                                    disabled={!locationSelection.stateCode}
                                >
                                    <SelectTrigger className="rounded-xl">
                                        <SelectValue placeholder="Select City (Optional)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {City.getCitiesOfState(locationSelection.countryCode, locationSelection.stateCode).map((c) => (
                                            <SelectItem key={c.name} value={c.name}>
                                                {c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                className="w-full rounded-xl border-dashed border-2 hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-all font-bold"
                                disabled={!locationSelection.countryCode}
                                onClick={() => {
                                    const c = Country.getCountryByCode(locationSelection.countryCode);
                                    const s = locationSelection.stateCode ? State.getStateByCodeAndCountry(locationSelection.stateCode, locationSelection.countryCode) : null;
                                    const city = locationSelection.city;

                                    let label = c?.name || "";
                                    if (s) label += ` > ${s.name}`;
                                    if (city) label += ` > ${city}`;

                                    if (label && !profileData.roleSpecificData.areasOfOperation.includes(label)) {
                                        setProfileData({
                                            ...profileData,
                                            roleSpecificData: {
                                                ...profileData.roleSpecificData,
                                                areasOfOperation: [...profileData.roleSpecificData.areasOfOperation, label]
                                            }
                                        });
                                        setLocationSelection({ countryCode: "", stateCode: "", city: "" });
                                    }
                                }}
                            >
                                + Add Operation Area
                            </Button>

                            <div className="flex flex-wrap gap-2 mt-2 min-h-12 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                {profileData.roleSpecificData.areasOfOperation.length === 0 ? (
                                    <span className="text-xs text-gray-400 font-medium italic">No areas added yet...</span>
                                ) : (
                                    profileData.roleSpecificData.areasOfOperation.map((area, idx) => (
                                        <Badge
                                            key={idx}
                                            className="px-3 py-1.5 rounded-xl bg-white text-gray-700 border-gray-200 shadow-sm hover:bg-red-50 hover:text-red-700 hover:border-red-100 transition-all group flex items-center gap-2"
                                        >
                                            <span className="text-[11px] font-bold">{area}</span>
                                            <X
                                                className="w-3 h-3 cursor-pointer opacity-40 group-hover:opacity-100"
                                                onClick={() => {
                                                    setProfileData({
                                                        ...profileData,
                                                        roleSpecificData: {
                                                            ...profileData.roleSpecificData,
                                                            areasOfOperation: profileData.roleSpecificData.areasOfOperation.filter((_, i) => i !== idx)
                                                        }
                                                    });
                                                }}
                                            />
                                        </Badge>
                                    ))
                                )}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Registration Certificate URL</label>
                            <Input
                                value={profileData.roleSpecificData.certificateUrl}
                                onChange={(e) => setProfileData({
                                    ...profileData,
                                    roleSpecificData: { ...profileData.roleSpecificData, certificateUrl: e.target.value }
                                })}
                                className="rounded-xl"
                                placeholder="https://cloud.storage.com/certificate.pdf"
                            />
                        </div>
                    </section>
                )}

                {userData.role === "CORPORATE" && (
                    <section className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold flex items-center gap-2 mb-2 text-purple-600">
                            <Building2 className="w-5 h-5" />
                            Corporate Partnership Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Company Name</label>
                                <Input
                                    value={profileData.roleSpecificData.companyName}
                                    onChange={(e) => setProfileData({
                                        ...profileData,
                                        roleSpecificData: { ...profileData.roleSpecificData, companyName: e.target.value }
                                    })}
                                    className="rounded-xl"
                                    placeholder="VanaGrow Industries"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Industry</label>
                                <Input
                                    value={profileData.roleSpecificData.industry}
                                    onChange={(e) => setProfileData({
                                        ...profileData,
                                        roleSpecificData: { ...profileData.roleSpecificData, industry: e.target.value }
                                    })}
                                    className="rounded-xl"
                                    placeholder="Technology / Manufacturing / etc."
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">CSR Focus Area</label>
                            <Input
                                value={profileData.roleSpecificData.csrFocus}
                                onChange={(e) => setProfileData({
                                    ...profileData,
                                    roleSpecificData: { ...profileData.roleSpecificData, csrFocus: e.target.value }
                                })}
                                className="rounded-xl"
                                placeholder="Carbon Neutrality, Social Upliftment, etc."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Sustainability Goals</label>
                            <Textarea
                                value={profileData.roleSpecificData.sustainabilityGoals}
                                onChange={(e) => setProfileData({
                                    ...profileData,
                                    roleSpecificData: { ...profileData.roleSpecificData, sustainabilityGoals: e.target.value }
                                })}
                                className="rounded-xl min-h-[80px]"
                                placeholder="What are your company's long term environmental goals?"
                            />
                        </div>
                    </section>
                )}

                {/* Footer Actions */}
                <div className="flex justify-end gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => refetch()}
                        className="font-bold rounded-xl"
                        disabled={isUpdating}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="rounded-xl min-w-[140px] font-bold shadow-lg shadow-green-200"
                        disabled={isUpdating}
                    >
                        {isUpdating ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Updating...
                            </>
                        ) : "Save Changes"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
