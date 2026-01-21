import { isRef } from "vue";
import { EMAIL_REGEX } from "@/common/constants";

const rules = {
  required: {
    rule: (value) => {
      const data = isRef(value) ? value.value : value;
      return !!data?.trim();
    },
    message: "Поле обязательно для заполнения",
  },
  email: {
    rule: (value) => {
      const data = isRef(value) ? value.value : value;
      const normalizedValue = String(data).toLowerCase();
      return data ? EMAIL_REGEX.test(normalizedValue) : true;
    },
    message: "Электроная почта имеет неверный формат",
  },
};

const validate = (value, appliedRules) => {
  let error = "";
  appliedRules.forEach((appliedRule) => {
    if (!rules[appliedRule]) {
      return;
    }
    const { rule, message } = rules[appliedRule];
    if (!rule(value)) {
      error = message;
    }
  });
  return error;
};

export const validateFields = (fields, validations) => {
  let isValid = true;
  Object.keys(validations).forEach((key) => {
    validations[key].error = validate(fields[key], validations[key].rules);
    if (validations[key].error) {
      isValid = false;
    }
  });
  return isValid;
};

export const clearValidationErrors = (validations) => {
  if (!validations) {
    return;
  }
  Object.keys(validations).forEach((key) => {
    validations[key].error = "";
  });
};