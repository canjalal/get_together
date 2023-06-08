export type NullableValidationFunction = (field: string) => string | null;
export type ValidationFunction = NonNullable<NullableValidationFunction>;
