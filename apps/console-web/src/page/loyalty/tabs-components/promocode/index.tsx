import { gql, useMutation } from "@apollo/client";
import { Box, Button, InputAdornment, Typography } from "@mui/material";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CustomInputField } from "../../../../components/input-fields";
import { AutoGenerateField } from "../../../../components/input-fields/AutoGenerateField";
import { DateRangePicker } from "../../../../components/input-fields/DateRangePicker";
import { ExtendedSelect } from "../../../../components/input-fields/ExtendedSelect";
import { InputFieldsWrapper } from "../../../../components/input-fields/InputFieldsWrapper";
import { RadioButtonGroup } from "../../../../components/input-fields/RadioButtonGroup";
import { FilterItem, ValidFor } from "./ValidFor";

const CREATE_PROMO_CODE = gql`
  mutation CreatePromoCode(
    $discountType: DiscountType!
    $discountValue: Float!
    $endTime: Date!
    $label: String!
    $minSpend: Float!
    $promoCode: String!
    $promoType: PromoType!
    $startTime: Date!
    $maxDiscountAmount: Float
    $totalRecurrence: TotalRecurrenceInput
    $validFor: [PromoCodeFilterInput!]
  ) {
    createPromoCode(
      discountType: $discountType
      discountValue: $discountValue
      endTime: $endTime
      label: $label
      minSpend: $minSpend
      promoCode: $promoCode
      promoType: $promoType
      startTime: $startTime
      maxDiscountAmount: $maxDiscountAmount
      totalRecurrence: $totalRecurrence
      validFor: $validFor
    ) {
      message
      status
    }
  }
`;

const UPDATE_PROMO_CODE = gql`
  mutation UpdatePromoCode(
    $id: ID!
    $discountType: DiscountType
    $discountValue: Float
    $endTime: Date
    $label: String
    $minSpend: Float
    $promoCode: String
    $promoType: PromoType
    $startTime: Date
    $maxDiscountAmount: Float
    $totalRecurrence: TotalRecurrenceInput
    $validFor: [PromoCodeFilterInput!]
  ) {
    updatePromoCode(
      id: $id
      discountType: $discountType
      discountValue: $discountValue
      endTime: $endTime
      label: $label
      minSpend: $minSpend
      promoCode: $promoCode
      promoType: $promoType
      startTime: $startTime
      maxDiscountAmount: $maxDiscountAmount
      totalRecurrence: $totalRecurrence
      validFor: $validFor
    ) {
      message
      status
    }
  }
`;

export const PromoCode: React.FC = () => {
  const location = useLocation();
  const promoCodeData = location.state?.promoCodeData;

  const [formState, setFormState] = useState({
    promoCodeName: "",
    referralCode: "",
    selectedDiscountType: "",
    selectedUsageLimit: "",
    rewardValue: "",
    minOrder: "",
    maxDiscountAmount: "",
    total: "",
    startDate: null as Date | null,
    endDate: null as Date | null,
    selectedPromoType: "Checkout Time",
    validFor: [] as FilterItem[],
  });

  const [message, setMessage] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState(false);

  const [createPromoCode, { loading: createLoading, error: createError }] =
    useMutation(CREATE_PROMO_CODE);
  const [updatePromoCode, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_PROMO_CODE);

  useEffect(() => {
    if (promoCodeData) {
      setFormState({
        promoCodeName: promoCodeData.label,
        referralCode: promoCodeData.promoCode,
        selectedDiscountType: promoCodeData.discountType.toLowerCase(),
        selectedUsageLimit: promoCodeData.recurrence || "",
        rewardValue: promoCodeData.discountValue.toString(),
        minOrder: promoCodeData.minSpend.toString(),
        maxDiscountAmount: promoCodeData.maxDiscountAmount?.toString() || "",
        total: promoCodeData.total?.toString() || "",
        startDate: new Date(promoCodeData.startTime),
        endDate: new Date(promoCodeData.endTime),
        selectedPromoType:
          promoCodeData.promoType === "CHECKOUT_TIME" ?
            "Checkout Time"
          : "Redeem",
        validFor: promoCodeData.validFor || [],
      });
      setIsEditMode(true);
    }
  }, [promoCodeData]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (
    e: ChangeEvent<{ value: unknown }>,
    name: string,
  ): void => {
    setFormState({
      ...formState,
      [name]: e.target.value as string,
    });
  };

  const handleDateChange = (start: Date | null, end: Date | null) => {
    setFormState({
      ...formState,
      startDate: start,
      endDate: end,
    });
  };

  const handlePromoCodeGenerated = (generatedCode: string) => {
    setFormState({
      ...formState,
      referralCode: generatedCode,
    });
  };

  const handleRadioChange = (value: string) => {
    setFormState({
      ...formState,
      selectedPromoType: value,
    });
  };

  const setValidFor = (validForData: FilterItem[]) => {
    setFormState((prevState) => ({
      ...prevState,
      validFor: validForData,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const {
      referralCode,
      selectedDiscountType,
      startDate,
      endDate,
      rewardValue,
      minOrder,
      maxDiscountAmount,
      selectedPromoType,
      validFor,
    } = formState;

    const discountTypeEnum =
      selectedDiscountType === "percentage" ? "PERCENTAGE" : "FLAT";
    const promoTypeEnum =
      selectedPromoType === "Checkout Time" ? "CHECKOUT_TIME" : "REDEEM";

    const payload = {
      discountType: discountTypeEnum,
      discountValue: parseFloat(rewardValue),
      endTime: endDate?.toISOString().split("T")[0],
      label: formState.promoCodeName,
      minSpend: parseFloat(minOrder),
      promoCode: referralCode,
      promoType: promoTypeEnum,
      startTime: startDate?.toISOString().split("T")[0],
      maxDiscountAmount: parseFloat(maxDiscountAmount) || null,
      totalRecurrence: null,
      validFor: validFor.map((filter) => ({
        operation: filter.operation,
        property: filter.property,
        value: filter.value[0],
      })),
    };

    try {
      if (isEditMode) {
        await updatePromoCode({
          variables: { id: promoCodeData.id, ...payload },
        });
        setMessage("Promo code updated successfully!");
      } else {
        await createPromoCode({
          variables: payload,
        });
        setMessage("Promo code created successfully!");
      }
    } catch (err) {
      setMessage("Error submitting promo code. Please try again.");
    }
  };

  const DISCOUNT_TYPES = [
    { value: "percentage", label: "Percentage" },
    { value: "flat", label: "Flat" },
  ];

  const USAGE_LIMIT_TYPES = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
  ];

  return (
    <Box
      sx={{
        mt: 3,
        width: "100%",
        justifyContent: "center",
        maxWidth: "650px",
        mx: "auto",
      }}
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <CustomInputField
          label="Promo Code Name"
          inputType="text"
          name="promoCodeName"
          placeholder="Promo Code Name"
          value={formState.promoCodeName}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <AutoGenerateField
          onGenerate={handlePromoCodeGenerated}
          initialValue={formState.referralCode}
        />
        <RadioButtonGroup
          labels={["Checkout Time", "Redeem"]}
          onChange={handleRadioChange}
          defaultValue={formState.selectedPromoType}
        />
        <DateRangePicker
          startDate={formState.startDate}
          endDate={formState.endDate}
          onStartDateChange={(date) =>
            handleDateChange(date, formState.endDate)
          }
          onEndDateChange={(date) =>
            handleDateChange(formState.startDate, date)
          }
        />

        <Box
          sx={{ display: "flex", flexDirection: "column", paddingBottom: 2 }}
        >
          <InputFieldsWrapper>
            <ExtendedSelect
              label="Usage Limit"
              name="selectedUsageLimit"
              options={USAGE_LIMIT_TYPES}
              value={formState.selectedUsageLimit}
              onChange={(e) =>
                handleSelectChange(
                  e as ChangeEvent<{ value: unknown }>,
                  "selectedUsageLimit",
                )
              }
              fullWidth
              sx={{
                "& .MuiInputBase-root": {
                  display: "flex",
                  alignItems: "center",
                },
                "& .MuiInputLabel-root": {
                  transform: "translate(10px, -50%) scale(1)",
                },
              }}
            />
            <CustomInputField
              inputType="text"
              placeholder="Total"
              label="Total"
              name="total"
              value={formState.total}
              onChange={handleInputChange}
            />
          </InputFieldsWrapper>
        </Box>
        <ValidFor validFor={formState.validFor} setValidFor={setValidFor} />

        <InputFieldsWrapper sx={{ paddingBottom: 2 }}>
          <ExtendedSelect
            label="Discount Type"
            name="selectedDiscountType"
            options={DISCOUNT_TYPES}
            value={formState.selectedDiscountType}
            onChange={(e) =>
              handleSelectChange(
                e as ChangeEvent<{ value: unknown }>,
                "selectedDiscountType",
              )
            }
            fullWidth
            sx={{
              "& .MuiInputBase-root": {
                display: "flex",
                alignItems: "center",
              },
              "& .MuiInputLabel-root": {
                transform: "translate(10px, -50%) scale(1)",
              },
            }}
          />
          {formState.selectedDiscountType === "percentage" ?
            <CustomInputField
              label="Discount Value"
              inputType="text"
              name="rewardValue"
              value={formState.rewardValue}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          : <CustomInputField
              label="Discount Value"
              inputType="text"
              name="rewardValue"
              value={formState.rewardValue}
              onChange={handleInputChange}
            />
          }
        </InputFieldsWrapper>

        <InputFieldsWrapper>
          <CustomInputField
            label="Min Order"
            inputType="text"
            name="minOrder"
            value={formState.minOrder}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">AED</InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          <CustomInputField
            label="Max Discount Amount"
            inputType="text"
            name="maxDiscountAmount"
            value={formState.maxDiscountAmount}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">AED</InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
        </InputFieldsWrapper>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: "100%" }}
          disabled={createLoading || updateLoading}
        >
          {createLoading || updateLoading ?
            "Submitting..."
          : isEditMode ?
            "Update Promo Code"
          : "Create Promo Code"}
        </Button>
        {(createError || updateError) && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            Error: {(createError || updateError)?.message}
          </Typography>
        )}
        {message && (
          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
