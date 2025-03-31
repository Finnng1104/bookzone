import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-cover bg-center relative px-4"
      style={{ backgroundImage: "url('/images/bookbg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Form đăng ký */}
      <div className="relative z-10 w-full max-w-md sm:w-8/12 md:w-6/12 lg:w-10/12">
        <RegisterForm />
      </div>
    </div>
  );
}
