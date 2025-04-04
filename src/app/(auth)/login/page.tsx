import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-cover bg-center relative px-4" 
      style={{ backgroundImage: "url('/images/bookbg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="relative z-10 w-full sm:w-96 md:w-4/12">
        <LoginForm />
      </div>
    </div>
  );
}
