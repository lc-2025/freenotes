'use client';

import apiClient from '@/apiClient';
import NoteCard from '@/components/Note/NoteCard';
import useApi from '@/hooks/Api';
import useStorage from '@/hooks/Storage';
import { ROUTE, STORAGE } from '@/utils/constants';
import { useEffect, useState } from 'react';

/**
 * @description Notebook component
 * @author Luca Cattide
 * @date 26/09/2025
 * @returns {*}  {Promise<React.ReactNode>}
 */
const Notebook = (): React.ReactNode => {
  const { getStorage } = useStorage();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    initNotes();
  }, []);

  const initNotes = async (): Promise<void> => {
    /* const { data, error } = await apiClient(`${ROUTE.API.NOTES}`, {
      ids: [''],
    });

    if (data) {
      setNotes(data as any);
    } */
  };

  return (
    <div className="home__container mx-4 mt-4 grid grid-cols-1 gap-4 md:mx-12 md:mt-4 md:grid-cols-3">
      {notes &&
        notes.length > 0 &&
        notes.map(({ title }, i) => (
          <NoteCard key={crypto.randomUUID() + i} title={title} />
        ))}
    </div>
  );
};

export default Notebook;
