import NavButtons from "../../../components/FormInputs/NavButtons";
import SelectInput from "../../../components/FormInputs/SelectInput";
import TextInput from "../../FormInputs/TextInput";
import ToggleInput from "../../../components/FormInputs/ToggleInput";
import {
  YOS,
  course,
  facultiesAndDepartment,
  gender,
} from "../../../constants";
import {
  setCurrentStep,
  updateFormData,
} from "../../../redux/slices/onboardingStudentsSlice";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import SelectInputCourse from "../../FormInputs/SelectInputCourse";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { validateEmail, validateMatricNumber } from "../../../lib/utils";

export default function PersonalInfoForm() {
  const currentStep = useSelector((store) => store.onboarding.currentStep);
  const formData = useSelector((store) => store.onboarding.formData);
  // console.log(formData, currentStep);
  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      ...formData,
    },
  });
  const dispatch = useDispatch();

  async function processData(data) {
    try {
      setLoading(true);
      if (!validateMatricNumber(formValues.matricNumber)) {
        return setError("matricNumber", {
          message: "Please enter a valid matric number.",
        });
      }

      if (
        !formValues.matricNumber ||
        !formValues.firstName ||
        !formValues.surName ||
        !formValues.gender ||
        !formValues.otherName ||
        !formValues.level ||
        !formValues.faculty ||
        !formValues.department
      ) {
        return toast.error("Please Fill in all the fields.", {
          position: "top-center",
        });
      }

      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/check",
        data
      );

      if (response.data) {
        toast.success(response.data.msg);
        const FData = {
          ...data,
          ...formData,
        };
        // console.log("FDATA: ===> ", FData)
        dispatch(updateFormData(FData));
        dispatch(setCurrentStep(currentStep + 1));
      }
      // console.log(data);
    } catch (error) {
      if (error.response.data.msg) {
        toast.error(error.response.data.msg);
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }
  // const onSelectionChange = (courses, ) => {
  //   const FData = { ...formData, courses };
  //   console.log("Line 120: ", formData.courses);
  // };

  const formValues = watch();

  //  console.log("formValues", formValues)
  const [departments, setDepartments] = useState([formData.department] || []);

  useEffect(() => {
    if (formValues.faculty) {
      // setDepartments(facultiesAndDepartment.map(item => item.faculty === formValues.faculty))
      setDepartments([
        `${
          formValues.faculty === "Select Faculty"
            ? "Please select a faculty to populate."
            : `Select Department in ${formValues.faculty}`
        }`,
        ...(facultiesAndDepartment.filter(
          (item) => item.faculty === formValues?.faculty
        )[0]?.departments || []),
      ]);
    }
  }, [formValues.faculty]);
  // useEffect(() => {
  //   const timeOut = setTimeout(async () => {
  //     if (formValues.phone) {
  //       if (formValues.phone.length === 11) {
  //         try {
  //           const response = await axios.post(
  //             import.meta.env.VITE_API_URL + "/checkPhone",
  //             {phone: formValues.phone}
  //           );
  //           if (response.data) {
  //             toast.message(response.data.msg);
  //             clearErrors("phone")
  //           }
  //         } catch (error) {
  //           if (error.response.data.msg) {
  //             // toast.error(error.response.data.msg)
  //             setError("phone", {
  //               message: error.response.data.msg,
  //             });
  //           }
  //         }
  //       }
  //     }
  //   }, 3000);
  //   return () => clearTimeout(timeOut);
  // }, [formValues.phone]);

  // useEffect(() => {
  //   const timeOut = setTimeout(async () => {
  //     if (formValues.email) {
  //       try {
  //         // 24/ED/CP/031
  //     if(!validateEmail(formValues.email)){
  //       return toast.error("Please enter a valid email.")
  //     }
  //         const response = await axios.post(
  //           import.meta.env.VITE_API_URL + "/checkEmail",
  //           { email: formValues.email }
  //         );
  //         if(response.data){
  //           toast.success(response.data.msg)
  //           clearErrors("email")
  //         }
  //       } catch (error) {
  //         if (error.response.data.msg) {
  //           setError("email", {
  //             message: error.response.data.msg,
  //           });
  //         } else {
  //           toast.error("Something went wrong.");
  //         }
  //       }
  //     }
  //   }, 3000);

  //   return () => clearTimeout(timeOut)
  // }, [formValues.email]);

  useEffect(() => {
    const timeOut = setTimeout(async () => {
      if (formValues.matricNumber) {
        try {
          if (!validateMatricNumber(formValues.matricNumber)) {
            return toast.error("Please enter a valid matric number.");
          }
          const response = await axios.post(
            import.meta.env.VITE_API_URL + "/checkMatricNumber",
            { matricNumber: formValues.matricNumber }
          );
          if (response.data) {
            toast.success(response.data.msg);
            clearErrors("matricNumber");
          }
        } catch (error) {
          if (error?.response?.data?.msg) {
            // toast.error(error.response.data.msg)
            setError("matricNumber", {
              message: error.response.data.msg,
            });
          }
        }
      }
    }, 3000);

    return () => clearTimeout(timeOut);
  }, [formValues.matricNumber]);

  const faculties = [
    "Select Faculty",
    ...facultiesAndDepartment.map((item) => item.faculty),
  ];
  return (
    <>
      <div className="absolute">
        <Toaster position="top-center" />
      </div>
      <form className="px-12 py-4" onSubmit={handleSubmit(processData)}>
        <div className="mb-8">
          <h5 className="text-xl md:text-3xl font-bold text-gray-900 ">
            Personal info
          </h5>
          <p className="text-lg font-semibold">
            Please fill every field in the form below.
          </p>
        </div>
        <div className="grid gap-4 grid-cols-2 ">
          <TextInput
            label={`Surname`}
            name="surName"
            register={register}
            isRequired="Surname is required"
            errors={errors}
            isUpper
          />
          <TextInput
            label={`First Name`}
            name="firstName"
            register={register}
            isRequired="First Name is required"
            errors={errors}
            isUpper
          />
          <TextInput
            label={`Other Name?`}
            name="otherName"
            register={register}
            isRequired="Other Name is required"
            errors={errors}
            isUpper
          />
          <SelectInputCourse
            label="Select your Gender"
            name="gender"
            register={register}
            options={gender}
          />
          {/* <TextInput
          label="Email Address"
          name="email"
          type="email"
          register={register}
          isRequired="Email Address is required"
          errors={errors}
        />
        <TextInput
          label="Phone Number"
          name="phone"
          type="number"
          register={register}
          isRequired="Phone Number is required"
          errors={errors}
          formValues={formValues}
          isPhone
  /> */}
          <SelectInput
            label="Faculty"
            name="faculty"
            register={register}
            options={faculties}
          />
          <SelectInput
            label="Department"
            name="department"
            register={register}
            errors={errors}
            options={departments || []}
          />
          <SelectInputCourse
            label="Year of study"
            name="level"
            register={register}
            options={YOS}
          />
          <TextInput
            label="Matric Number"
            type="text"
            name="matricNumber"
            placeholder={"Enter matriculation number (e.g. 23/AB/CD/123)"}
            register={register}
            isRequired="Matric Number is required"
            errors={errors}
          />
          {/* <SelectInput
            label="Select your GST Course (GST 212, GST 221)"
            name="courses"
            register={register}
            options={course}
          /> */}
          {/* <ToggleInput
          label={"Select your GST Course (GST 122, GST 221)"}
          name={"courses"}
          options={course}
          data={formData}
          level={YOS}
          // onSelectionChange={(options) => onSelectionChange(options)}
        />
        <TextInput
          label="Password"
          name="password"
          register={register}
          // type="password"
          isRequired="Password is required"
          errors={errors}
          isPass
        /> */}
        </div>

        <NavButtons loading={loading} />
      </form>
    </>
  );
}
