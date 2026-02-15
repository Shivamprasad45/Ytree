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
import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar";


const ROLES_INFO = {
    USER: {
        label: "Individual User",
        dashboard: "/Tree/Free_clam_tree",
        icon: Users,
        color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800",
    },
    NGO: {
        label: "NGO Partner",
        dashboard: "/NGO/Dashboard",
        icon: ShieldCheck,
        color: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800",
    },
    CORPORATE: {
        label: "Corporate Partner",
        dashboard: "/Corporate/Dashboard",
        icon: Building2,
        color: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800",
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
            <div className="bg-card rounded-3xl shadow-xl overflow-hidden border border-border mb-8">
                <div className="px-8 pb-10">
                    <div className="rounded-3xl p-8">
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10">
                            <div className="flex-1">
                                {/* Avatar + Name */}
                                <div className="flex items-center gap-6">
                                    <div className="relative">
                                        <img
                                            src={userData.image || "/img/default-avatar.png"}
                                            alt="Avatar"
                                            className="w-28 h-28 rounded-3xl object-cover 
                         border-4 "
                                        />
                                        <div className="absolute -bottom-2 -right-2 
                            bg-emerald-500 p-2 rounded-xl 
                            border-4 border-black/40 shadow-lg">
                                            <CheckCircle className="w-4 h-4 text-white" />
                                        </div>
                                    </div>

                                    <div>
                                        <h1 className="text-3xl font-extrabold leading-tight text-black dark:text-white">
                                            {userData.firstName} {userData.lastName}
                                        </h1>

                                        {(profileData.roleSpecificData.ngoName ||
                                            profileData.roleSpecificData.companyName) && (
                                                <p className="text-black font-semibold text-emerald-400">
                                                    {profileData.roleSpecificData.ngoName ||
                                                        profileData.roleSpecificData.companyName}
                                                </p>
                                            )}
                                    </div>
                                </div>

                                {/* Info Chips */}
                                <div className="flex flex-wrap gap-3 mt-6">

                                    <div className="flex items-center gap-2 
                          bg-white/5 border border-white/10 
                          px-4 py-2 rounded-xl text-sm font-medium">
                                        <Mail className="w-4 h-4 text-emerald-400" />
                                        <span>{userData.email}</span>
                                    </div>

                                    {profileData.address.city && (
                                        <div className="flex items-center gap-2 
                            bg-white/5 border border-white/10 
                            px-4 py-2 rounded-xl text-sm font-medium">
                                            <MapPin className="w-4 h-4 text-orange-400" />
                                            <span>{profileData.address.city}</span>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2 
                          bg-white/5 border border-white/10 
                          px-4 py-2 rounded-xl text-sm font-medium">
                                        <Users className="w-4 h-4 text-blue-400" />
                                        <span>{userData.referredUsers} Referrals</span>
                                    </div>

                                </div>

                                {/* Bio */}
                                {profileData.bio && (
                                    <div className="mt-6 bg-white/5 border border-white/10 
                          p-5 rounded-2xl text-sm italic 
                          text-gray-300 leading-relaxed">
                                        “{profileData.bio}”
                                    </div>
                                )}

                            </div>

                            {/* RIGHT SIDE */}
                            <div className="flex flex-col items-end gap-6">

                                {/* Progress Card */}
                                <div className=" p-6 rounded-2xl text-center w-60">

                                    <p className="text-xs uppercase tracking-widest 
                        text-gray-400 font-semibold mb-4">
                                        Profile Completion
                                    </p>

                                    <div className="relative flex items-center justify-center">
                                        <AnimatedCircularProgressBar
                                            max={100}
                                            min={0}
                                            value={completionPercentage}
                                            gaugePrimaryColor="rgb(99 102 241)"
                                            gaugeSecondaryColor="rgba(255,255,255,0.08)"
                                            className="w-28 h-28"
                                        />
                                        {/* <span className="absolute text-xl font-bold text-black">
                                            {completionPercentage}%
                                        </span> */}
                                    </div>
                                </div>

                                {/* Dashboard Button */}
                                <div className="flex flex-col gap-4 w-64">

                                    <Button
                                        onClick={() => router.push(roleInfo.dashboard)}
                                        className="group relative w-full h-12 rounded-2xl 
               bg-gradient-to-r from-indigo-600 to-indigo-500 
               hover:from-indigo-500 hover:to-indigo-400
               transition-all duration-300 ease-out
               shadow-lg hover:shadow-indigo-500/30
               active:scale-[0.98]
               flex items-center justify-center gap-2
               font-semibold text-white tracking-wide"
                                    >
                                        <LayoutDashboard className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                        <span>Go to Dashboard</span>
                                    </Button>

                                    <div className={`flex items-center gap-4 px-5 py-4 
                   rounded-2xl border border-white/10
                   bg-white/5 backdrop-blur-lg
                   shadow-md hover:shadow-lg
                   transition-all duration-300 ${roleInfo.color}`}>

                                        <div className="p-2 rounded-xl bg-white/10">
                                            <RoleIcon className="w-5 h-5" />
                                        </div>

                                        <div className="leading-tight">
                                            <p className="text-[11px] uppercase font-semibold opacity-60 tracking-wider">
                                                Account Type
                                            </p>
                                            <p className="font-semibold text-sm mt-0.5">
                                                {roleInfo.label}
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <form onSubmit={handleUpdate} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* General Information */}
                    <section className="bg-card p-6 rounded-3xl border border-border shadow-sm space-y-4">
                        <h2 className="text-lg font-bold flex items-center gap-2 mb-2">
                            <UserIcon className="w-5 h-5 text-muted-foreground" />
                            Account Info
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted-foreground uppercase ml-1">First Name</label>
                                <Input
                                    value={userData.firstName}
                                    onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                                    className="rounded-xl"
                                    placeholder="John"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Last Name</label>
                                <Input
                                    value={userData.lastName}
                                    onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                                    className="rounded-xl"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Bio</label>
                            <Textarea
                                value={profileData.bio}
                                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                className="rounded-xl min-h-[100px]"
                                placeholder="Tell us about your environmental mission..."
                            />
                        </div>
                    </section>

                    {/* Contact Details */}
                    <section className="bg-card p-6 rounded-3xl border border-border shadow-sm space-y-4">
                        <h2 className="text-lg font-bold flex items-center gap-2 mb-2">
                            <Phone className="w-5 h-5 text-muted-foreground" />
                            Contact Details
                        </h2>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Phone Number</label>
                            <Input
                                value={profileData.phoneNumber}
                                onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
                                className="rounded-xl"
                                placeholder="+1 234 567 890"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Location</label>
                            <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-xl">
                                <MapPin className="ml-2 w-4 h-4 text-muted-foreground" />
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
                                <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Website</label>
                                <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-xl">
                                    <Globe className="ml-2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        value={profileData.socialLinks.website}
                                        onChange={(e) => setProfileData({ ...profileData, socialLinks: { ...profileData.socialLinks, website: e.target.value } })}
                                        className="border-none bg-transparent shadow-none"
                                        placeholder="https://example.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Twitter</label>
                                <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-xl">
                                    <Twitter className="ml-2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        value={profileData.socialLinks.twitter}
                                        onChange={(e) => setProfileData({ ...profileData, socialLinks: { ...profileData.socialLinks, twitter: e.target.value } })}
                                        className="border-none bg-transparent shadow-none"
                                        placeholder="Twitter URL"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted-foreground uppercase ml-1">LinkedIn</label>
                                <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-xl">
                                    <Linkedin className="ml-2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        value={profileData.socialLinks.linkedin}
                                        onChange={(e) => setProfileData({ ...profileData, socialLinks: { ...profileData.socialLinks, linkedin: e.target.value } })}
                                        className="border-none bg-transparent shadow-none"
                                        placeholder="LinkedIn URL"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Instagram</label>
                                <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-xl">
                                    <Instagram className="ml-2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        value={profileData.socialLinks.instagram}
                                        onChange={(e) => setProfileData({ ...profileData, socialLinks: { ...profileData.socialLinks, instagram: e.target.value } })}
                                        className="border-none bg-transparent shadow-none"
                                        placeholder="Instagram URL"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Facebook</label>
                                <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-xl">
                                    <Facebook className="ml-2 w-4 h-4 text-muted-foreground" />
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
                    <section className="bg-card p-6 rounded-3xl border border-blue-100 dark:border-blue-900 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400">
                            <ShieldCheck className="w-5 h-5" />
                            NGO Verification & Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted-foreground uppercase ml-1">NGO Legal Name</label>
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
                                <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Registration Number</label>
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
                            <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Mission Statement</label>
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
                            <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Areas of Operation</label>

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
                                className="w-full rounded-xl border-dashed border-2 hover:bg-green-50 dark:hover:bg-green-900/10 hover:text-green-700 dark:hover:text-green-400 hover:border-green-200 dark:hover:border-green-800 transition-all font-bold"
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

                            <div className="flex flex-wrap gap-2 mt-2 min-h-12 p-3 bg-muted/50 rounded-2xl border border-border">
                                {profileData.roleSpecificData.areasOfOperation.length === 0 ? (
                                    <span className="text-xs text-muted-foreground font-medium italic">No areas added yet...</span>
                                ) : (
                                    profileData.roleSpecificData.areasOfOperation.map((area, idx) => (
                                        <Badge
                                            key={idx}
                                            className="px-3 py-1.5 rounded-xl bg-card text-foreground border-border shadow-sm hover:bg-red-50 hover:text-red-700 hover:border-red-100 transition-all group flex items-center gap-2"
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
                            <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Registration Certificate URL</label>
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
                    <section className="bg-card p-6 rounded-3xl border border-purple-100 dark:border-purple-900 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold flex items-center gap-2 mb-2 text-purple-600 dark:text-purple-400">
                            <Building2 className="w-5 h-5" />
                            Corporate Partnership Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Company Name</label>
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
                                <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Industry</label>
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
                            <label className="text-xs font-bold text-muted-foreground uppercase ml-1">CSR Focus Area</label>
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
                            <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Sustainability Goals</label>
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
                <div className="flex justify-end gap-4 p-4 bg-muted/50 rounded-2xl border border-border">
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
                        className="rounded-xl min-w-[140px] font-bold shadow-lg shadow-primary/20"
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
