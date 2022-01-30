import { projects } from '../../../lib/projects';

export default (req, res) => {
  res.status(200).json(projects)
}
