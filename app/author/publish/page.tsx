
;
import CreateNewsForm from "@/components/CreateNewsForm";
import checkAuthentication from "@/lib/checkAuthentication"; // Import your authentication check function

export default function CreateNewsPage() {


 

  return (
    <div className="container mx-auto py-10 px-4">
      <CreateNewsForm />
    </div>
  );
}
