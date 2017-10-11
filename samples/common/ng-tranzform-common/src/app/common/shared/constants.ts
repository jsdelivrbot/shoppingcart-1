export class AppConstants {

   public authContextPath = '/tzf/ui/context';
   public refreshTokenURL = '/tzf/ui/context';
   public basePath = '/tzf/ui/context';
   public idpBasePath = '/tzf/ui/context';
   public LogoutUrl = '/tzf/ui/context';
   public LoginUrl = '/tzf/ui/context';
   public baseFundUrl = '/tzf/ui/context';
   public helpConstant = '/tzf/ui/context';



    public static instance() {
        return new AppConstants();
    }

};
