export const CONNECTIONS = [
  // Left arm
  ['left_shoulder', 'left_elbow'],
  ['left_elbow', 'left_wrist'],

  // Right arm
  ['right_shoulder', 'right_elbow'],
  ['right_elbow', 'right_wrist'],

  // Shoulders across
  ['left_shoulder', 'right_shoulder'],

  // Torso
  ['left_shoulder', 'left_hip'],
  ['right_shoulder', 'right_hip'],
  ['left_hip', 'right_hip'],

  // Left leg
  ['left_hip', 'left_knee'],
  ['left_knee', 'left_ankle'],

  // Right leg
  ['right_hip', 'right_knee'],
  ['right_knee', 'right_ankle'],
]