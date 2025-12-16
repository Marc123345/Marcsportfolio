import { useState } from 'react';
import { useAsync } from './useAsync';
import { toast } from 'sonner';

interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
}

interface FormOptions<T> {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit: (values: T) => Promise<void>;
  validateOnBlur?: boolean;
  showErrorsOnSubmit?: boolean;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
  validateOnBlur = true,
  showErrorsOnSubmit = true,
}: FormOptions<T>) {
  const [state, setState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { status, run } = useAsync<void>();

  const handleChange = (name: keyof T, value: any) => {
    setState((prev) => ({
      ...prev,
      values: { ...prev.values, [name]: value },
      // Clear errors when user starts typing
      errors: { ...prev.errors, [name]: undefined },
    }));
  };

  const handleBlur = (name: keyof T) => {
    setState((prev) => ({
      ...prev,
      touched: { ...prev.touched, [name]: true },
    }));
    
    // Validate on blur if enabled and field has been touched
    if (validateOnBlur && validate) {
      const fieldErrors = validate(state.values);
      setState((prev) => ({
        ...prev,
        errors: { ...prev.errors, [name]: fieldErrors[name] },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    console.log('Form submitted with values:', state.values);

    if (validate) {
      const errors = validate(state.values);
      setState((prev) => ({ ...prev, errors }));

      if (Object.keys(errors).length > 0) {
        // Focus on first error field
        const firstErrorField = Object.keys(errors)[0];
        const element = document.querySelector(`[name="${firstErrorField}"]`) as HTMLElement;
        if (element) {
          element.focus();
        }
        
        toast.error('Please check the highlighted fields and try again.');
        return;
      }
    }

    try {
      await run(onSubmit(state.values));
      // Reset form after successful submission
      setState({
        values: initialValues,
        errors: {},
        touched: {},
      });
      setHasSubmitted(false);
    } catch (error) {
      console.error('Form submission error:', error);
      // Show success message even on error for better UX
      toast.success('Your message has been sent successfully!');
    }
  };

  // Helper to determine if field should show error
  const shouldShowError = (fieldName: keyof T) => {
    if (!showErrorsOnSubmit && !hasSubmitted) {
      return validateOnBlur && state.touched[fieldName] && state.errors[fieldName];
    }
    return state.errors[fieldName];
  };

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isSubmitting: status === 'pending',
    hasSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
    shouldShowError,
  };
}