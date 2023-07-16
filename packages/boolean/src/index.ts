import { BasicEngine } from '@grandom/engines'
import RandomBoolean from './RandomBoolean'

const random = new RandomBoolean(new BasicEngine())
const boolean = random.boolean.bind(random)

export default boolean
