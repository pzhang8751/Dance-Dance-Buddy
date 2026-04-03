
export function useElectron() {
  const openVideo = async () => {
    return await window.electronAPI.openVideo()
  }

  const comparePoses = async (data) => {
    return await window.electronAPI.comparePoses(data)
  }

  return { openVideo, comparePoses }
}