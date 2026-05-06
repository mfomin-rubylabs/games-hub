// example interface file — split state and actions so Zustand can type-check each separately
// all object shapes use interface — never type alias

export interface IExampleState {
  items: Record<number, string>
  isInitialised: boolean
}

export interface IExampleActions {
  addItem: (id: number, value: string) => void
  removeItem: (id: number) => void
  setInitialised: () => void
  clear: () => void
}
