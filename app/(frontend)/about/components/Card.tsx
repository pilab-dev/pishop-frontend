import { ReactNode } from "react";

interface CardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function Card({ icon, title, description, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}
    >
      {icon && <div className="text-blue-600 text-4xl mb-4">{icon}</div>}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="text-center">
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
