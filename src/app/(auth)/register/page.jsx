import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Join BlueCrown to support meaningful campaigns or launch your own ideas."
    >
      <RegisterForm />
    </AuthLayout>
  );
}