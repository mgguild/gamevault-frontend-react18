import { GuildpadConfig } from './types'
import DemoleGuildpad from './Guildpads/Demole'
import Wizardia from './Guildpads/Wizardia'
import Wizardia2 from './Guildpads/Wizardia2'
import GuildpadsLaunched from './guildpadsLaunched'
import Ookeenga from './Guildpads/Ookeenga'
import Ookeenga2 from './Guildpads/Ookeenga2'
import PlayZap from './Guildpads/PlayZap'

const Guildpads: GuildpadConfig[] = [
  ...GuildpadsLaunched,
  {
    id: 4,
    title: 'Demole',
    isStatic: true,
    ...DemoleGuildpad,
  },
  {
    id: 5,
    title: 'PlayZap',
    isStatic: true,
    ...PlayZap,
  },
]

export default Guildpads
