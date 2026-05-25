export const consultationModalContent = {
  title: "Speak To An Expert",
  footnote: "We never share your contact info with anyone.",
  submitLabel: "Schedule A Free Consultation Now!",
  privacyLabel: "Privacy Policy",
  termsLabel: "Terms of Service",
  privacyHref: "/privacy",
  termsHref: "/terms",
};

export interface ConsultationFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  comments: string;
}

export const initialConsultationFormData: ConsultationFormData = {
  name: "",
  email: "",
  phone: "",
  service: "",
  comments: "",
};
