'use client';

import { useState } from 'react';
import apiClient from '@/apiClient';
import CustomFormField from '@/components/Layout/CustomFormField';
import CustomButton from '@/components/Layout/CustomButton';
import { useUserContext } from '@/hooks/State';
import { NOTE, ROUTE, SECTION, STATE, STORAGE } from '@/utils/constants';
import { TNote } from '@/types/components/Note';
import { useStorage } from '@lc-2025/storage-manager';
import { useRouter } from 'next/navigation';
import useStore from '@/hooks/Store';

/**
 * @description New note component
 * @author Luca Cattide
 * @date 24/10/2025
 * @returns {*}  {React.ReactNode}
 */
const NoteNew = (): React.ReactNode => {
  const { TITLE, CONTENT } = NOTE.LABEL;
  const { NEW } = SECTION;
  const router = useRouter();
  const [note, setNote] = useState<TNote>(STATE.DEFAULT.NOTE);
  const { email } = useUserContext();
  const { getStorage } = useStorage('session');
  const { getAccessToken } = useStore();
  const { content, title } = note;
  const fields = [
    {
      id: 'note-title',
      label: TITLE,
      placeholder: TITLE,
      value: title,
    },
    {
      id: 'note-content',
      isTextarea: true,
      label: CONTENT,
      placeholder: CONTENT,
      value: content!,
    },
  ];

  /**
   * @description New note input handler
   * @author Luca Cattide
   * @date 24/10/2025
   * @param {(React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)} e
   * @param {string} type
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: string,
  ): void => {
    setNote((state) => ({
      ...state,
      [type]: e.target.value,
    }));
  };

  /**
   * @description New note saving handler
   * @author Luca Cattide
   * @date 24/10/2025
   * @returns {*}  {Promise<void>}
   */
  const handleSave = async (): Promise<void> => {
    const userEmail = email ?? getStorage(STORAGE.EMAIL);
    const { data, error } = await apiClient(
      `${ROUTE.API.NOTES}`,
      {
        body: content!,
        pinned: false,
        title,
        user: { email: 'asd@asd.com' },
      },
      {
        access_token: (await getAccessToken(userEmail)) ?? '',
      },
    );

    if (error) {
      console.error(error);
      // TODO: Show error
    } else if (data) {
      router.push(ROUTE.NOTES.PATH);
    }
  };

  return (
    <>
      <div className="new__container mx-4 mt-4 flex flex-1 flex-col md:mx-12 md:mt-8">
        {fields.map((field, i) => (
          <CustomFormField {...field} callback={handleChange} key={i} />
        ))}
      </div>
      <aside className="new__action mx-4 mt-4 md:mx-12 md:mt-8">
        <h6 className="action__title hidden">{NEW}</h6>
        <CustomButton
          ariaLabel="Save note"
          callback={handleSave}
          color="bg-blue-600 dark:bg-blue-500"
          text="Save"
          type="button"
        />
      </aside>
    </>
  );
};

export default NoteNew;
