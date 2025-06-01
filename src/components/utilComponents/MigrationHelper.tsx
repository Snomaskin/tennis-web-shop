import { uploadProductsToFirestore } from "../../utils/uploadProducts";


const MigrationHelper = () => {
  const runMigration = async () => {
    try {
      await uploadProductsToFirestore();
      console.log('Migration completed!');
    } catch (error) {
      console.error('Migration failed:', error);
    }
  };

  (window as any).runMigration = runMigration;

  return <div>Migration helper loaded. Run window.runMigration() in console.</div>;
};

export { MigrationHelper };