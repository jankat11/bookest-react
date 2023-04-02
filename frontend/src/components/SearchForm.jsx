import { useNavigate, useNavigation, Form, redirect } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const SearchForm = () => {
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  console.log(isSubmitting);

  return (
    <Form method="post" className="input-group rounded-0 my-3">
      <input
        type="text"
        name="searchData"
        className="form-control rounded-0 search-input"
        placeholder="Search a book or author"
        aria-label="Search a book or author"
        aria-describedby="button-addon2"
      />
      <button
        className="btn btn-primary rounded-0 search-button"
        type="submit"
        id="button-addon2"
      >
        {!isSubmitting ? "Search" : <Spinner size="sm" animation="grow" />}
      </button>
    </Form>
  );
};
export default SearchForm;

export async function action({ request }) {
  const data = await request.formData();
  console.log(data.get("searchData"));
  return redirect("/");
}
