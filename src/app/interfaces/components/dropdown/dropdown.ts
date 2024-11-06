export type DropDownValue = string | number | undefined;

export interface DropdownOption {
  value: DropDownValue,
  text: string,
  icon?: string // image path
}