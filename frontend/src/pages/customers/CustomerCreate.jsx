import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {createCustomer} from "../../api/customers";
import ComponentCard from "../../components/common/ComponentCard.jsx";
import Label from "../../components/form/Label.jsx";
import Input from "../../components/form/input/InputField.jsx";
import PageBreadcrumb from "../../components/common/PageBreadCrumb.jsx";
import TextArea from "../../components/form/input/TextArea.js";
import Button from "../../components/ui/button/Button.jsx";
import {CheckLineIcon, PlusIcon} from "../../icons/index.js";

export default function CustomerCreate() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: 1,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const {name, value} = e.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: name === "status" ? Number(value) : value,
    }));
    setErrors((prev) => ({...prev, [name]: undefined})); // clear field error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCustomer(customer);
      navigate("/customers");
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors); // show validation errors
      } else {
        console.error("Unexpected error", err);
      }
    }
  };

  return (
    <>
      <PageBreadcrumb pageTitle="Add Customer"/>
      <ComponentCard>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label htmlFor="name">Customer Name</Label>
            <Input type="text" name="name" value={customer.name} id="name" onChange={handleChange} placeholder="Name" />
            {errors.name && <p className="text-red-600 text-sm">{errors.name[0]}</p>}
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input type="email" name="email" id="email" onChange={handleChange} placeholder="Email Address" />
            {errors.email && <p className="text-red-600 text-sm">{errors.email[0]}</p>}
          </div>
          <div>
            <Label htmlFor="phone">Phone Nr.</Label>
            <Input type="text" name="phone" id="phone" onChange={handleChange} placeholder="Phone Nr." />
            {errors.phone && <p className="text-red-600 text-sm">{errors.phone[0]}</p>}
          </div>
          <div>
            <Label>Address</Label>
            <TextArea
              rows={6}
              value={customer.address}
              error
              onChange={handleChange}
              placeholder="Please enter a valid address"
            />
            {errors.address && <p className="text-red-600 text-sm">{errors.address[0]}</p>}
          </div>

          <select
            name="status"
            value={customer.status}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
          {errors.status && <p className="text-red-600 text-sm">{errors.status[0]}</p>}
          <div>
            <Button variant="outline" size="sm" startIcon={<CheckLineIcon className="size-5" />}>
              Save Customer
            </Button>
          </div>
        </form>
      </ComponentCard>
    </>
  );
}
