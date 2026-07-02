// 1. تحديد الـ Type الخاص بالبيانات القادمة من الـ Form
import { RegisterSchemaType } from '@/features/auth/schemas/registerSchema';

/**
 * دالة تسجيل مستخدم جديد
 * تفصل بين الـ Form Data وما يتوقعه الـ API
 */
export const registerUser = async (data: RegisterSchemaType) => {
  const payload = mapToRegisterPayload(data);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'registration_failed');
  }

  return response.json();
};

/**
 * وظيفة مساعدة لتحويل بيانات الـ Form إلى شكل الـ API
 * (فصلنا المنطق ده عشان الكود يبقى DRY وسهل الاختبار)
 */
function mapToRegisterPayload(data: RegisterSchemaType) {
  return {
    username: `${data.firstName}${data.lastName}`,
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword,
    firstName: data.firstName,
    lastName: data.lastName,
    gender: data.gender.toUpperCase(),
  };
}
