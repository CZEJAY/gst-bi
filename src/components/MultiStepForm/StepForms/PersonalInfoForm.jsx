import NavButtons from "../../../components/FormInputs/NavButtons";
import SelectInput from "../../../components/FormInputs/SelectInput";
import TextInput from "../../FormInputs/TextInput";
import ToggleInput from "../../../components/FormInputs/ToggleInput";
import { facultiesAndDepartment } from "../../../constants";
import { useFormEventStore } from "../../../context/zustand";
import {
  setCurrentStep,
  updateFormData,
} from "../../../redux/slices/onboardingStudentsSlice";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import SelectInputCourse from "../../FormInputs/SelectInputCourse";
import { Toaster, toast } from "sonner";
import axios from "axios";
import debounce from "lodash.debounce";

export default function PersonalInfoForm() {
  const currentStep = useSelector((store) => store.onboarding.currentStep);
  const formData = useSelector((store) => store.onboarding.formData);
  console.log(formData, currentStep);
  const [loading, setLoading] = useState(false);
  const gender = [
    {
      id: "non",
      title: "Gender",
    },
    {
      id: "male",
      title: "Male",
    },
    {
      id: "female",
      title: "Female",
    },
  ];
  const course = [
    {
      id: "GST 122",
      title: "GST 122",
    },
    {
      id: "GST 221",
      title: "GST 221",
    },
  ];
  const YOS = [
    {
      id: "non",
      title: "Select Level",
    },
    {
      id: "Level 100",
      title: "Level 100",
    },
    {
      id: "Level 200",
      title: "Level 200",
    },
    {
      id: "Level 200 (DE)",
      title: "Level 200 (DE)",
    },
    {
      id: "Level 300",
      title: "Level 300",
    },
    {
      id: "Level 400",
      title: "Level 400",
    },
    {
      id: "Level 500",
      title: "Level 500",
    },
  ];
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      ...formData,
    },
  });
  const dispatch = useDispatch();
  const { data: zusData, setData } = useFormEventStore();

  async function processData(data) {
    
    try {
      // setLoading(true)
      // const response = await axios.post(
      //   import.meta.env.VITE_API_URL + "/check",
      //   data,
      // );
      // if(response.data){
      //   toast.success("Checked!")
      // }
      dispatch(updateFormData(data));
      dispatch(setCurrentStep(currentStep + 1));
      // console.log(data);
    } catch (error) {
      if(error.response.data.msg){
        toast.error(error.response.data.msg)
      } else {
        toast.error("Something went wrong.")
      }
    } finally {
      // setLoading(false)
    }
  }
  const onSelectionChange = (courses, ) => {
    const FData = { ...formData, courses };
    console.log("Line 120: ", formData.courses);
    dispatch(updateFormData(FData));
  };

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
  useEffect(() => {
    const check = async () => {
      if (formValues.phone) {
        if (formValues.phone.length === 11) {
          try {
            const response = await axios.post(
              import.meta.env.VITE_API_URL + "/checkPhone",
              {phone: formValues.phone}
            );
            if (response.data) {
              // toast.message("Phone Number Not Found");
            }
          } catch (error) {
            if (error.response.data.msg) {
              // toast.error(error.response.data.msg)
              setError("phone", {
                message: error.response.data.msg,
              });
            } else {
              toast.error("Something went wrong.");
            }
          }
        }
      }
    };
    check();
  }, [formValues.phone]);

  const checkEmail = useCallback(
    debounce(async () => {
      if (formValues.email) {
        try {
          const response = await axios.post(
            import.meta.env.VITE_API_URL + "/checkEmail",
            { email: formValues.email }
          );
          
        } catch (error) {
          if (error.response.data.msg) {
            setError("email", {
              message: error.response.data.msg,
            });
          } else {
            toast.error("Something went wrong.");
          }
        }
      }
    }, 2000), [])
  
  useEffect(() => {
    checkEmail()
  }, [formValues.email, checkEmail]);

  const  checkMtNm = useCallback(
    debounce(async () => {
      if (formValues.matricNumber) {
        try {
          const response = await axios.post(
            import.meta.env.VITE_API_URL + "/checkMatricNumber",
            {matricNumber: formValues.matricNumber}
          );
          
        } catch (error) {
          if (error.response.data.msg) {
            // toast.error(error.response.data.msg)
            setError("matricNumber", {
              message: error.response.data.msg,
            });
          }
        }
      }
    }, 3000), [])
  
  useEffect(() => {
    checkMtNm()
  }, [formValues.matricNumber, checkMtNm]);

  const faculties = [
    "Select Faculty",
    ...facultiesAndDepartment.map((item) => item.faculty),
  ];
  return (
    <form className="px-12 py-4" onSubmit={handleSubmit(processData)}>
      <Toaster position="top-center" />
      <div className="mb-8">
        <h5 className="text-xl md:text-3xl font-bold text-gray-900 ">
          Personal info
        </h5>
        <p>Please fill every field in the form below.</p>
      </div>
      <div className="grid gap-4 grid-cols-2 ">
        <TextInput
          label={`Surname`}
          name="surName"
          register={register}
          isRequired="Surname is required"
          errors={errors}
        />
        <TextInput
          label={`First Name`}
          name="firstName"
          register={register}
          isRequired="First Name is required"
          errors={errors}
        />
        <TextInput
          label={`Other Name?`}
          name="otherName"
          register={register}
          isRequired="Other Name is required"
          errors={errors}
        />
        <SelectInputCourse
          label="Select your Gender"
          name="gender"
          register={register}
          options={gender}
        />
        <TextInput
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
          isPhone
        />
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
        <ToggleInput
          label={"Select your GST Course (GST 122, GST 221)"}
          name={"courses"}
          register={register}
          options={course}
          data={formData}
          level={YOS}
          onSelectionChange={(options) => onSelectionChange(options)}
        />
        <TextInput
          label="Password"
          name="password"
          register={register}
          // type="password"
          isRequired="Password is required"
          errors={errors}
          isPass
        />
      </div>

      <NavButtons loading={loading} />
    </form>
  );
}
