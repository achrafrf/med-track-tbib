
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface PatientFormProps {
  setIsDialogOpen: (open: boolean) => void;
  onAddPatient: (patient: NewPatient) => void;
}

export interface NewPatient {
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  insurance: string;
  insuranceId: string;
  medicalHistory: string[];
  avatar?: string;
}

const PatientForm = ({ setIsDialogOpen, onAddPatient }: PatientFormProps) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<Omit<NewPatient, "medicalHistory"> & { medicalHistory: string }>({
    name: "",
    age: 0,
    gender: "",
    phone: "",
    email: "",
    insurance: "CNSS",
    insuranceId: "",
    medicalHistory: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.phone || !formData.insurance || !formData.insuranceId) {
      toast.error(t("patients.error.requiredFields"));
      return;
    }

    // Convert medical history string to array
    const medicalHistoryArray = formData.medicalHistory
      .split(",")
      .map(item => item.trim())
      .filter(item => item !== "");

    // Create new patient object
    const newPatient: NewPatient = {
      ...formData,
      age: Number(formData.age),
      medicalHistory: medicalHistoryArray,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
    };

    // Add patient
    onAddPatient(newPatient);
    setIsDialogOpen(false);
    toast.success(t("patients.success.created"));
  };

  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>{t("patients.addNew")}</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t("patients.form.name")}</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t("patients.form.namePlaceholder")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">{t("patients.form.age")}</Label>
            <Input
              id="age"
              name="age"
              type="number"
              value={formData.age || ""}
              onChange={handleChange}
              placeholder={t("patients.form.agePlaceholder")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">{t("patients.form.gender")}</Label>
            <Select
              value={formData.gender}
              onValueChange={(value) => handleSelectChange("gender", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("patients.form.genderPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">{t("patients.form.male")}</SelectItem>
                <SelectItem value="Female">{t("patients.form.female")}</SelectItem>
                <SelectItem value="Other">{t("patients.form.other")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t("patients.form.phone")}</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t("patients.form.phonePlaceholder")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("patients.form.email")}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("patients.form.emailPlaceholder")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="insurance">{t("patients.form.insurance")}</Label>
            <Select
              value={formData.insurance}
              onValueChange={(value) => handleSelectChange("insurance", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("patients.form.insurancePlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CNSS">CNSS</SelectItem>
                <SelectItem value="RAMED">RAMED</SelectItem>
                <SelectItem value="Private">{t("patients.form.private")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="insuranceId">{t("patients.form.insuranceId")}</Label>
            <Input
              id="insuranceId"
              name="insuranceId"
              value={formData.insuranceId}
              onChange={handleChange}
              placeholder={t("patients.form.insuranceIdPlaceholder")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="medicalHistory">{t("patients.form.medicalHistory")}</Label>
          <Textarea
            id="medicalHistory"
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleChange}
            placeholder={t("patients.form.medicalHistoryPlaceholder")}
            rows={3}
          />
          <p className="text-xs text-muted-foreground">
            {t("patients.form.medicalHistoryHelp")}
          </p>
        </div>

        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setIsDialogOpen(false)}
          >
            {t("common.cancel")}
          </Button>
          <Button type="submit">{t("common.save")}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default PatientForm;
