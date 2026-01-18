"use client";

import React, { useState, useEffect } from 'react';
import { PartnershipData, FormStep } from '../types';
import { getSustainabilityInsights } from '../geminiService';

import { useSubmitApplicationMutation } from "@/app/Featuers/Partnership/PartnershipApi"; // Import path might need adjustment based on alias

const ApplicationForm: React.FC = () => {
  const [step, setStep] = useState<FormStep>(FormStep.DETAILS);
  const [formData, setFormData] = useState<PartnershipData>({
    companyName: '',
    industry: 'Technology',
    treeGoal: '500-2,000',
    contactName: '',
    email: '',
  });
  const [aiInsight, setAiInsight] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // RTK Query Mutation Hook
  const [submitApplication, { isLoading: isSubmitting }] = useSubmitApplicationMutation();

  const industries = ["Technology", "Manufacturing", "Finance", "Retail", "Energy", "Other"];
  const goals = ["100-500", "500-2,000", "2,000+"];

  useEffect(() => {
    if (step === FormStep.REVIEW) {
      handleGenerateInsight();
    }
  }, [step]);

  const handleGenerateInsight = async () => {
    setIsAiLoading(true);
    const insight = await getSustainabilityInsights(formData.industry, formData.treeGoal);
    setAiInsight(insight);
    setIsAiLoading(false);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(FormStep.REVIEW);
  };

  const handleBack = () => {
    setStep(FormStep.DETAILS);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await submitApplication(formData).unwrap();
      alert("Application Submitted! Our team will contact you soon.");

      // Reset form
      setStep(FormStep.DETAILS);
      setFormData({
        companyName: '',
        industry: 'Technology',
        treeGoal: '500-2,000',
        contactName: '',
        email: '',
      });
    } catch (error: any) {
      console.error("Submission failed:", error);
      alert(error.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section className="px-6 md:px-10 py-16 mb-24" id="apply">
      <div className="max-w-[800px] mx-auto bg-white dark:bg-[#1a2e1a] rounded-2xl shadow-xl overflow-hidden border border-[#dbe6db] dark:border-[#2a3a2a]">
        <div className="bg-primary h-1 w-full"></div>
        <div className="p-8 md:p-12">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-black text-[#111811] dark:text-white mb-2">Partnership Application</h2>
            <p className="text-[#618961] dark:text-[#a0c0a0]">Tell us about your organization and impact goals.</p>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= FormStep.DETAILS ? 'bg-primary text-white' : 'border-2 border-[#dbe6db] dark:border-[#2a3a2a] text-[#618961]'}`}>1</div>
                <span className={`text-xs font-bold ${step >= FormStep.DETAILS ? 'text-[#111811] dark:text-white' : 'text-[#618961]'}`}>Details</span>
              </div>
              <div className={`w-12 h-[2px] ${step >= FormStep.REVIEW ? 'bg-primary' : 'bg-[#dbe6db] dark:bg-[#2a3a2a]'}`}></div>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold ${step === FormStep.REVIEW ? 'bg-primary text-white border-primary' : 'border-[#dbe6db] dark:border-[#2a3a2a] text-[#618961]'}`}>2</div>
                <span className={`text-xs font-bold ${step === FormStep.REVIEW ? 'text-[#111811] dark:text-white' : 'text-[#618961]'}`}>Review</span>
              </div>
            </div>
          </div>

          {step === FormStep.DETAILS ? (
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleNext}>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#111811] dark:text-white">Company Name</label>
                <input
                  required
                  className="w-full bg-background-light dark:bg-background-dark border-[#dbe6db] dark:border-[#2a3a2a] rounded-lg focus:ring-primary focus:border-primary px-4 py-2.5"
                  placeholder="e.g. EcoCorp Global"
                  type="text"
                  value={formData.companyName}
                  onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#111811] dark:text-white">Industry</label>
                <select
                  className="w-full bg-background-light dark:bg-background-dark border-[#dbe6db] dark:border-[#2a3a2a] rounded-lg focus:ring-primary focus:border-primary px-4 py-2.5"
                  value={formData.industry}
                  onChange={e => setFormData({ ...formData, industry: e.target.value })}
                >
                  {industries.map(i => <option key={i}>{i}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-sm font-bold text-[#111811] dark:text-white">Estimated Annual Tree Goal</label>
                <div className="grid grid-cols-3 gap-3">
                  {goals.map(goal => (
                    <label key={goal} className="cursor-pointer">
                      <input
                        className="peer hidden"
                        name="tree_goal"
                        type="radio"
                        checked={formData.treeGoal === goal}
                        onChange={() => setFormData({ ...formData, treeGoal: goal })}
                      />
                      <div className="p-3 text-center border border-[#dbe6db] dark:border-[#2a3a2a] rounded-lg peer-checked:border-primary peer-checked:bg-primary/5 text-sm font-medium transition-all">
                        {goal}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#111811] dark:text-white">Primary Contact Name</label>
                <input
                  required
                  className="w-full bg-background-light dark:bg-background-dark border-[#dbe6db] dark:border-[#2a3a2a] rounded-lg focus:ring-primary focus:border-primary px-4 py-2.5"
                  placeholder="Full Name"
                  type="text"
                  value={formData.contactName}
                  onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-[#111811] dark:text-white">Work Email</label>
                <input
                  required
                  className="w-full bg-background-light dark:bg-background-dark border-[#dbe6db] dark:border-[#2a3a2a] rounded-lg focus:ring-primary focus:border-primary px-4 py-2.5"
                  placeholder="name@company.com"
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="md:col-span-2 mt-4">
                <button className="w-full bg-primary text-[#111811] font-black py-4 rounded-xl shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2" type="submit">
                  Next Step: Project Review
                  <span className="material-symbols-outlined">arrow_right_alt</span>
                </button>
                <p className="text-center text-[11px] text-[#618961] dark:text-[#a0c0a0] mt-4 uppercase tracking-widest">Our team typically responds within 24 hours</p>
              </div>
            </form>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">auto_awesome</span>
                  AI Sustainability Insight
                </h4>
                {isAiLoading ? (
                  <div className="flex items-center gap-3 py-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
                    <span className="text-sm text-[#618961]">Generating your custom strategy...</span>
                  </div>
                ) : (
                  <p className="text-[#111811] dark:text-white/90 italic leading-relaxed">
                    &quot;{aiInsight}&quot;
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-4 border border-[#dbe6db] dark:border-[#2a3a2a] rounded-lg">
                  <p className="text-[#618961] mb-1">Company</p>
                  <p className="font-bold dark:text-white">{formData.companyName}</p>
                </div>
                <div className="p-4 border border-[#dbe6db] dark:border-[#2a3a2a] rounded-lg">
                  <p className="text-[#618961] mb-1">Industry</p>
                  <p className="font-bold dark:text-white">{formData.industry}</p>
                </div>
                <div className="p-4 border border-[#dbe6db] dark:border-[#2a3a2a] rounded-lg">
                  <p className="text-[#618961] mb-1">Tree Goal</p>
                  <p className="font-bold dark:text-white">{formData.treeGoal} trees/year</p>
                </div>
                <div className="p-4 border border-[#dbe6db] dark:border-[#2a3a2a] rounded-lg">
                  <p className="text-[#618961] mb-1">Contact</p>
                  <p className="font-bold dark:text-white">{formData.contactName} ({formData.email})</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <button
                  onClick={handleBack}
                  className="flex-1 border border-[#dbe6db] dark:border-[#2a3a2a] text-[#111811] dark:text-white font-bold py-4 rounded-xl hover:bg-black/5 transition-all"
                >
                  Edit Details
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`flex-[2] bg-primary text-[#111811] font-black py-4 rounded-xl shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? "Submitting..." : "Confirm & Submit Application"}
                  {!isSubmitting && <span className="material-symbols-outlined">send</span>}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;
