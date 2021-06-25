class VacationsModel {
   public uuid: string;
   public vacationId: number;
   public vacationName: string;
   public description: string;
   public destination: string;
   public image: FileList;
   public startDate: string;
   public endDate: string;
   public price: number;
   public followers: number;
   public currentUserFallow: boolean;

   public static convertToFormDataAdd(vacation: VacationsModel): FormData {
      const myFormData = new FormData();

      myFormData.append("vacationName", vacation.vacationName);
      myFormData.append("description", vacation.description);
      myFormData.append("destination", vacation.destination);
      myFormData.append("startDate", vacation.startDate);
      myFormData.append("endDate", vacation.endDate);
      myFormData.append("price", vacation.price.toLocaleString());
      myFormData.append("image", vacation.image.item(0));
      return myFormData;
   }

   public static convertToFormDataPatch(vacation: VacationsModel): FormData {
      const myFormData = new FormData();

      myFormData.append("vacationId", vacation.vacationId.toLocaleString());
      myFormData.append("vacationName", vacation.vacationName);
      myFormData.append("description", vacation.description);
      myFormData.append("destination", vacation.destination);
      myFormData.append("startDate", vacation.startDate);
      myFormData.append("endDate", vacation.endDate);
      myFormData.append("price", vacation.price.toLocaleString());
      myFormData.append("image", vacation.image.item(0));
      return myFormData;
   }
}

export default VacationsModel;
