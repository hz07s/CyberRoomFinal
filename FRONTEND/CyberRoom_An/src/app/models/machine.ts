export interface Machine {
  idMachine: number;
  machineName: string;
  machineRange: number;
  assignedUser: string;
  machineStatus:  string; // default status
  operatingSystem: string;
  installedSoftware: string;
  lastMaintenance: Date;
  acquisitionDate: Date;
  ipAddress: string;
  macAddress: string;
  processor: string;
  ram: number;
  hardDrive: string;
  location: string;
  additionalNotes: string;
}