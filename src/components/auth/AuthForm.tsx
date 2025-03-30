import React, { ReactNode } from "react";

interface AuthFormProps {
  title: string;
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, children, onSubmit }) => {
  return (
    <div className="w-full mx-auto mt-1 px-14 py-12 bg-white rounded-3xl shadow-2xl border border-gray-300">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">{title}</h2>
      <form onSubmit={onSubmit} className="space-y-6 w-full">{children}</form>
    </div>
  );
};

export default AuthForm;