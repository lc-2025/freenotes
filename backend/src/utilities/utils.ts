import mongoose from 'mongoose';
import TQueryFilter from 'src/types/query.type';

const setFilter = (ids: Array<string>): TQueryFilter => ({
  _id: {
    $in: ids.map((id: string) => new mongoose.Types.ObjectId(id)),
  },
});

export { setFilter };
