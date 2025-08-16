"use client";

import { FancyTitle } from "@/components/fancy-title";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ContactForm } from "./contact-form";

export default function PricingPage() {
  return (
    <div className="flex flex-col items-center h-screen">
      <div className="bg-gray-200 py-4 w-full flex justify-center align-center">
        <div className="max-w-7xl w-full justify-center">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="max-w-7xl w-full">
        <div className="flex flex-row gap-8 my-10">
          <div className="w-2/3">
            <ContactForm />
          </div>
          <div className="w-1/3 flex flex-col gap-8">
            <FancyTitle className="text-3xl font-bold">Get in touch</FancyTitle>
            <p className="text-lg text-gray-500">
              We&apos;re here to help you with any questions or concerns you
              have.
            </p>

            <FancyTitle className="text-3xl font-bold">
              Social Networks
            </FancyTitle>
          </div>
        </div>
      </div>
    </div>
  );
}
