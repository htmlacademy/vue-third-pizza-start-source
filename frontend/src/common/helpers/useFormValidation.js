import { reactive, toRefs } from 'vue';
import {EMAIL_REGEX} from "../constants";

// Набор правил: для каждого поля список функций-валидаторов и сообщений
const defaultRules = {
  required: {
    validate: v => String(v).trim().length > 0,
    message: 'Поле обязательно для заполнения',
  },
  email: {
    validate: v => EMAIL_REGEX.test(String(v).toLowerCase()),
    message: 'Неверный формат e-mail',
  }
};

export function useFormValidation(initialValues, fieldRules) {
  // form — реактивный объект со всеми полями формы
  const form   = reactive({ ...initialValues });
  // errors — реактивный объект, куда пишем текст ошибки для каждого поля
  const errors = reactive(
    Object.keys(initialValues).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {})
  );

  // проверка одного поля по списку ключей правил
  function validateField(field) {
    errors[field] = ''; // сброс
    const val   = form[field];
    const rules = fieldRules[field] || [];
    for (const ruleName of rules) {
      const rule = defaultRules[ruleName];
      if (rule && !rule.validate(val)) {
        errors[field] = rule.message;
        break;
      }
    }
    return !errors[field]; // true, если ошибок нет
  }

  // проверяет все поля, возвращает true/false
  function validateForm() {
    let isValid = true;
    for (const field of Object.keys(fieldRules)) {
      if (!validateField(field)) {
        isValid = false;
      }
    }
    return isValid;
  }

  // сброс всех ошибок
  function resetErrors() {
    for (const field of Object.keys(errors)) {
      errors[field] = '';
    }
  }

  return {
    ...toRefs(form), // примеры: email, password и т.п.
    errors,
    validateField,
    validateForm,
    resetErrors,
  };
}
