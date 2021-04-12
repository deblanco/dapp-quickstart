export const sleep = (sleepTime: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), sleepTime)
  })
}
