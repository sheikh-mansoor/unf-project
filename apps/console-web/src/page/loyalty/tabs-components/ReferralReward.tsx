import { gql, useMutation } from "@apollo/client";
import { Box, Button, InputAdornment, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CustomInputField } from "../../../components/input-fields";
import { ExtendedSelect } from "../../../components/input-fields/ExtendedSelect";

const UPDATE_REFERRAL_REWARD = gql`
  mutation UpdateReferralReward(
    $updateReferralRewardId: ID!
    $discountType: DiscountType
    $discountValue: Float
    $maxDiscountAmount: Float
    $minSpend: Float
    $points: Int
  ) {
    updateReferralReward(
      id: $updateReferralRewardId
      discountType: $discountType
      discountValue: $discountValue
      maxDiscountAmount: $maxDiscountAmount
      minSpend: $minSpend
      points: $points
    ) {
      message
      referralReward {
        discountType
        discountValue
        id
        maxDiscountAmount
        minSpend
        rewardType
      }
      status
    }
  }
`;

const CREATE_REFERRAL_REWARD = gql`
  mutation CreateReferralReward(
    $discountType: DiscountType!
    $discountValue: Float!
    $minSpend: Float!
    $maxDiscountAmount: Float
    $points: Int
    $rewardType: String
  ) {
    createReferralReward(
      discountType: $discountType
      discountValue: $discountValue
      minSpend: $minSpend
      maxDiscountAmount: $maxDiscountAmount
      points: $points
      rewardType: $rewardType
    ) {
      message
      referralReward {
        discountType
        discountValue
        id
        maxDiscountAmount
        minSpend
        points
        rewardType
      }
      status
    }
  }
`;

interface FormState {
  rewardValue: string;
  reward: string;
  rewardType: string;
  minSpend: string;
  maxDiscount: string;
}

export const ReferralReward: React.FC = () => {
  const location = useLocation();
  const rewardData = location.state?.rewardData;

  const [formState, setFormState] = useState<FormState>({
    rewardValue: "",
    reward: "",
    rewardType: "",
    minSpend: "",
    maxDiscount: "",
  });
  const [message, setMessage] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState(false);

  const [createReferralReward, { loading: createLoading, error: createError }] =
    useMutation(CREATE_REFERRAL_REWARD, {
      onCompleted: (data) => {
        setMessage(
          `Reward created successfully: ${data.createReferralReward.message}`,
        );
      },
      onError: (err) => {
        setMessage(`Error creating reward: ${err.message}`);
      },
    });

  const [updateReferralReward, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_REFERRAL_REWARD, {
      onCompleted: (data) => {
        setMessage(
          `Reward updated successfully: ${data.updateReferralReward.message}`,
        );
      },
      onError: (err) => {
        setMessage(`Error updating reward: ${err.message}`);
      },
    });

  useEffect(() => {
    if (rewardData) {
      setFormState({
        rewardValue: rewardData.discountValue.toString(),
        reward: rewardData.rewardType,
        rewardType: rewardData.discountType.toLowerCase(),
        minSpend: rewardData.minSpend.toString(),
        maxDiscount: rewardData.maxDiscountAmount?.toString() || "",
      });
      setIsEditMode(true);
    }
  }, [rewardData]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (
    e: ChangeEvent<{ value: unknown }>,
    name: string,
  ): void => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: e.target.value as string,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const discountTypeEnum =
      formState.rewardType === "percentage" ? "PERCENTAGE" : "FLAT";

    const payload = {
      discountType: discountTypeEnum,
      discountValue: parseFloat(formState.rewardValue),
      minSpend: parseFloat(formState.minSpend),
      maxDiscountAmount:
        formState.maxDiscount ? parseFloat(formState.maxDiscount) : null,
      points:
        formState.reward === "points" ?
          parseInt(formState.rewardValue, 10)
        : null,
    };

    if (isEditMode) {
      updateReferralReward({
        variables: { updateReferralRewardId: rewardData.id, ...payload },
      });
    } else {
      createReferralReward({
        variables: payload,
      });
    }
  };

  const REWARD_OPTIONS = [
    { value: "discount", label: "Discount" },
    { value: "points", label: "Points" },
  ];

  const REWARD_TYPE = [
    { value: "percentage", label: "Percentage" },
    { value: "flat", label: "Flat" },
  ];

  return (
    <Box sx={{ mt: 3, width: "100%", maxWidth: "650px", mx: "auto" }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <ExtendedSelect
          label="Reward"
          options={REWARD_OPTIONS}
          value={formState.reward}
          onChange={(e) =>
            handleSelectChange(e as ChangeEvent<{ value: unknown }>, "reward")
          }
          fullWidth
          sx={{ mb: 2, width: "100%" }}
        />
        <ExtendedSelect
          label="Reward Type"
          options={REWARD_TYPE}
          value={formState.rewardType}
          onChange={(e) =>
            handleSelectChange(
              e as ChangeEvent<{ value: unknown }>,
              "rewardType",
            )
          }
          fullWidth
          sx={{ mb: 2, width: "100%" }}
        />
        <CustomInputField
          label={
            formState.reward === "discount" ? "Discount Value" : "Points Value"
          }
          inputType="text"
          name="rewardValue"
          value={formState.rewardValue}
          onChange={handleInputChange}
          InputProps={{
            endAdornment:
              formState.reward === "discount" ?
                <InputAdornment position="end">%</InputAdornment>
              : undefined,
          }}
          sx={{ mb: 2, width: "100%" }}
        />

        <CustomInputField
          label="Min Spend"
          inputType="text"
          name="minSpend"
          value={formState.minSpend}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">AED</InputAdornment>
            ),
          }}
          sx={{ mb: 2, width: "100%" }}
        />
        <CustomInputField
          label="Max Discount Amount"
          inputType="text"
          name="maxDiscount"
          value={formState.maxDiscount}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">AED</InputAdornment>
            ),
          }}
          sx={{ mb: 2, width: "100%" }}
        />
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
            "Update Reward"
          : "Create Reward"}
        </Button>
      </Box>
      {message && (
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
      {(createError || updateError) && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          Error: {(createError || updateError)?.message}
        </Typography>
      )}
    </Box>
  );
};
