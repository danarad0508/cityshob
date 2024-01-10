import { ConnectionStrengthEnum } from "../../enums/connection.strength.enum";
import { GeoObjectTypeEnum } from "../../enums/geo.object.type.enum";

export interface GeoObjectDto {
  id: number;
  type: GeoObjectTypeEnum;
  typeId: number;
  name: string; //i.e. Sensor 1
  info: string; //i.e. Camera 1 - ideally this should be an identifier as Camera 1 maybe is used by other sensors, but for the simplicity
                //of this exercise I'm referring to is as additional info for object.
  connStrength: ConnectionStrengthEnum;
  // There is a checkbox that user can select - seems to me, based on available info, that checkbox isn't part of the geo
  // object data but it is used for user selection in order to perform a certain action on object.
  // If it is a prop of geo object that I would add a boolean prop for it.
}
