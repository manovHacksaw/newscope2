import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CldUploadWidget } from "next-cloudinary";
import { Upload } from 'lucide-react';
import { toast } from "sonner";

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  placeholder?: string;
  type?: string;
}

export const TextInput = ({ label, name, value, onChange, required = false, placeholder, type = "text" }: InputProps) => (
  <div className="space-y-2">
    <Label htmlFor={name} className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</Label>
    <Input
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      type={type}
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    />
  </div>
);

interface ThumbnailUploadProps {
  onSuccess: (url: string) => void;
  value: string;
}

export const ThumbnailUpload = ({ onSuccess, value }: ThumbnailUploadProps) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">Thumbnail</Label>
    <CldUploadWidget
      uploadPreset="newthumb"
      onSuccess={({ info }) => {
        onSuccess(info.secure_url);
        toast.success("Thumbnail uploaded successfully!");
      }}
    >
      {({ open }) => (
        <Button
          type="button"
          variant="outline"
          className="w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition duration-300"
          onClick={() => open()}
        >
          <Upload className="mr-2 h-4 w-4" /> Upload Thumbnail
        </Button>
      )}
    </CldUploadWidget>
    {value && (
      <p className="text-sm text-muted-foreground dark:text-gray-400">
        Thumbnail uploaded: {value}
      </p>
    )}
  </div>
);

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
  categories: string[];
}

export const CategorySelect = ({ value, onChange, categories }: CategorySelectProps) => (
  <div className="space-y-2">
    <Label htmlFor="category" className="text-sm font-medium text-gray-700 dark:text-gray-200">Category</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

