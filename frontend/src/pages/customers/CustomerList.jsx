import {useEffect, useState} from "react";
import {getCustomers, deleteCustomer} from "../../api/customers";
import {useNavigate} from "react-router-dom";
import PageBreadcrumb from "../../components/common/PageBreadCrumb.jsx";
import {Table, TableBody, TableCell, TableHeader, TableRow} from "../../components/ui/table/index.jsx";
import {Link} from "react-router";
import Button from "../../components/ui/button/Button.jsx";
import {EyeIcon, PencilIcon, PlusIcon, TrashBinIcon} from "../../icons/index.js";
import Alert from "../../components/ui/alert/Alert.jsx";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await getCustomers();
      setCustomers(res.data || []); // use res.data directly
    } catch (err) {
      console.error("Failed to fetch customers", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure?")) {
      try {
        await deleteCustomer(id);
        fetchCustomers();
      } catch (err) {
        console.error("Failed to delete customer", err);
      }
    }
  };

  if (loading) return <p className="text-center mt-10">Loading customers...</p>;

  return (
    <>
      <PageBreadcrumb pageTitle="Customers"/>
      <div className="mt-10">
        {customers.length === 0 ?
          (<Alert variant="warning" title="No customers found" message="There are no customers"/>) :
          (
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white pt-4 dark:border-gray-800 dark:bg-white/[0.03]">
              <div className="flex flex-col gap-5 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                    Customer List
                  </h3>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <form>
                    <div className="relative">
                    <span className="absolute -translate-y-1/2 pointer-events-none top-1/2 left-4">
                      <svg className="fill-gray-500 dark:fill-gray-400" width="20" height="20" viewBox="0 0 20 20"
                           fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M3.04199 9.37381C3.04199 5.87712 5.87735 3.04218 9.37533 3.04218C12.8733 3.04218 15.7087 5.87712 15.7087 9.37381C15.7087 12.8705 12.8733 15.7055 9.37533 15.7055C5.87735 15.7055 3.04199 12.8705 3.04199 9.37381ZM9.37533 1.54218C5.04926 1.54218 1.54199 5.04835 1.54199 9.37381C1.54199 13.6993 5.04926 17.2055 9.37533 17.2055C11.2676 17.2055 13.0032 16.5346 14.3572 15.4178L17.1773 18.2381C17.4702 18.531 17.945 18.5311 18.2379 18.2382C18.5308 17.9453 18.5309 17.4704 18.238 17.1775L15.4182 14.3575C16.5367 13.0035 17.2087 11.2671 17.2087 9.37381C17.2087 5.04835 13.7014 1.54218 9.37533 1.54218Z"
                              fill=""></path>
                      </svg>
                    </span>
                      <input type="text" placeholder="Search..."
                             className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-10 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pr-4 pl-[42px] text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden xl:w-[300px] dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"/>
                    </div>
                  </form>
                  <div>
                    <Button size="sm" variant="primary" startIcon={<PlusIcon className="size-5" />} onClick={() => navigate('/customers/create')}>
                      Add Customer
                    </Button>
                  </div>
                </div>
              </div>
              <div className="max-w-full overflow-x-auto">
                <Table>
                  <TableHeader className="border-gray-100 border-y bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
                    <TableRow>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Customer
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Email
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Phone
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {customers.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                          <div className="flex items-center">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-100">
                              <span className="text-xs font-semibold text-brand-500">
                                {c.first_name.charAt(0).toUpperCase()} {c.last_name.charAt(0).toUpperCase()}
                              </span>
                              </div>
                              <div>
                            <span className="text-theme-sm mb-0.5 block font-medium text-gray-700 dark:text-gray-400">
                              {c.first_name} {c.first_name}
                            </span>
                                <span className="text-gray-500 text-theme-sm dark:text-gray-400">
                              <Link to={'mailto:' + c.email}>{c.email}</Link>
                            </span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {c.email}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {c.phone}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          <div className="flex items-start gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              startIcon={<PencilIcon className="size-5" />}
                              onClick={() => navigate(`/customers/edit/${c.id}`)}>
                              Edit
                            </Button>
                            <Button size="sm" variant="outline" startIcon={<TrashBinIcon className="size-5" />}>
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
      </div>
    </>
  );
}
