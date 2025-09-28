'use client';

import { useEffect, useState } from 'react';
import apiClient from '@/apiClient';
import NoteCard from '@/components/Note/NoteCard';
import { useUserContext } from '@/hooks/State';
import { ROUTE } from '@/utils/constants';
import { TNotes } from '@/types/components/Note';

/**
 * @description Notebook component
 * @author Luca Cattide
 * @date 26/09/2025
 * @returns {*}  {Promise<React.ReactNode>}
 */
const Notebook = (): React.ReactNode => {
  const user = useUserContext();
  const [notes, setNotes] = useState<TNotes>([]);

  useEffect(() => {
    initNotes();
  }, []);

  /**
   * @description Notes initialization helper
   * @author Luca Cattide
   * @date 28/09/2025
   * @returns {*}  {Promise<void>}
   */
  const initNotes = async (): Promise<void> => {
    const { data, error } = await apiClient(`${ROUTE.API.NOTES}`, {
      ids: user.notes.join(','),
    });

    if (error) {
      // TODO:
    } else if (data) {
      setNotes(data as any);
    }
  };

  return (
    <div className="home__container mx-4 mt-4 grid grid-cols-1 gap-4 md:mx-12 md:mt-4 md:grid-cols-3">
      {notes.length > 0 &&
        notes.map(({ title }, i) => (
          <NoteCard key={crypto.randomUUID() + i} title={title} />
        ))}
    </div>
  );
};

export default Notebook;
