'use client';

import { useState } from 'react';
import CustomButton from './CustomButton';

export default function FormAuthentication({ type }: { type: 'login' | 'register' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <section className="max-w-mobile md:max-w-desktop bg-light-bg dark:bg-dark-bg flex h-[41.6875rem] min-h-screen w-full flex-col items-center">
      <header className="h-header-mobile md:h-header-desktop bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border flex w-full items-center justify-center border-b px-1 py-1.5 md:px-2">
        <h1 className="text-1.25rem md:text-1.5rem text-light-text dark:text-dark-text font-bold">
          {type === 'login' ? 'Login' : 'Register'}
        </h1>
      </header>
      <section className="mx-1 mt-1 flex flex-col gap-1 md:mx-2 md:mt-2">
        {type === 'register' && (
          <div className="max-w-note-mobile md:max-w-note-desktop h-field-title-mobile md:h-field-title-desktop w-full">
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-1rem md:text-1.125rem text-light-text dark:text-dark-text placeholder:text-light-placeholder dark:placeholder:text-dark-placeholder h-full w-full rounded-lg bg-gray-100 px-0.5 font-normal focus-visible:outline focus-visible:outline-blue-600 md:rounded-xl md:px-1 dark:bg-gray-700"
            />
          </div>
        )}
        <div className="max-w-note-mobile md:max-w-note-desktop h-field-title-mobile md:h-field-title-desktop w-full">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-1rem md:text-1.125rem text-light-text dark:text-dark-text placeholder:text-light-placeholder dark:placeholder:text-dark-placeholder h-full w-full rounded-lg bg-gray-100 px-0.5 font-normal focus-visible:outline focus-visible:outline-blue-600 md:rounded-xl md:px-1 dark:bg-gray-700"
          />
        </div>
        <div className="max-w-note-mobile md:max-w-note-desktop h-field-title-mobile md:h-field-title-desktop w-full">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-1rem md:text-1.125rem text-light-text dark:text-dark-text placeholder:text-light-placeholder dark:placeholder:text-dark-placeholder h-full w-full rounded-lg bg-gray-100 px-0.5 font-normal focus-visible:outline focus-visible:outline-blue-600 md:rounded-xl md:px-1 dark:bg-gray-700"
          />
        </div>
        {type === 'register' && (
          <div className="max-w-note-mobile md:max-w-note-desktop h-field-title-mobile md:h-field-title-desktop w-full">
            <label htmlFor="confirm-password" className="sr-only">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="text-1rem md:text-1.125rem text-light-text dark:text-dark-text placeholder:text-light-placeholder dark:placeholder:text-dark-placeholder h-full w-full rounded-lg bg-gray-100 px-0.5 font-normal focus-visible:outline focus-visible:outline-blue-600 md:rounded-xl md:px-1 dark:bg-gray-700"
            />
          </div>
        )}
        <CustomButton
          text={type === 'login' ? 'Login' : 'Register'}
          color="bg-blue-600 dark:bg-blue-500"
          ariaLabel={type === 'login' ? 'Submit login' : 'Submit registration'}
        />
        <CustomButton
          text="Sign in with Google"
          color="bg-gray-100 dark:bg-gray-700"
          ariaLabel="Sign in with Google"
        />
      </section>
    </section>
  );
}
