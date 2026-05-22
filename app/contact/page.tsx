import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Amazon Geeks — scale your brand with marketplace automation and performance marketing.",
};

export default function Contact() {
  return <ContactPage />;
}
