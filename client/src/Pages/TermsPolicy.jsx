import React from 'react';

const TermsPolicy = () => {
  return (
    <div className='bg-root_bluish text-Text min-h-screen p-6 my-8'>
      <header className='bg-trans_bluish p-4 text-center'>
        <h1 className='text-3xl font-bold'>ChemGenie</h1>
        {/* <nav className='mt-4'>
          <ul className='flex justify-center space-x-4'>
            <li>
              <a href='#how-it-works' className='hover:text-secondary-main'>
                How it works
              </a>
            </li>
            <li>
              <a href='#products' className='hover:text-secondary-main'>
                Products
              </a>
            </li>
            <li>
              <a href='#pricing' className='hover:text-secondary-main'>
                Pricing & FAQ
              </a>
            </li>
            <li>
              <a href='#settings' className='hover:text-secondary-main'>
                Settings
              </a>
            </li>
          </ul>
        </nav> */}
      </header>

      <main className='max-w-4xl mx-auto mt-10'>
        <section className='bg-primary-main p-6 text-onPrimary-main rounded-lg shadow-lg'>
          <h2 className='text-2xl font-bold mb-4'>
            We care about your privacy
          </h2>
          <p>
            Your privacy is important to us at ChemGenie. We respect your
            privacy regarding any information we may collect from you across our
            website.
          </p>
        </section>

        <section className='mt-8'>
          <h3 className='text-xl font-bold mb-4'>
            What information do we collect?
          </h3>
          <p>
            We collect information when you register on our site, fill out a
            form, or enter information on our site. This information includes,
            but is not limited to, your name, email address, and profile photo.
          </p>
        </section>

        <section className='mt-8'>
          <h3 className='text-xl font-bold mb-4'>
            How do we use your information?
          </h3>
          <p>
            We use the information we collect from you to personalize your
            experience, improve our website, and better respond to your
            individual needs. Your data is stored securely in our database with
            fully encrypted passwords.
          </p>
        </section>
        <section className='mt-8'>
          <h3 className='text-xl font-bold mb-4'>Cookie Usage</h3>
          <p>
            Our website uses cookies to enhance your experience while visiting
            our site. Cookies are small files that are stored on your computer's
            hard drive and are used to improve our website's usability and
            personalize your experience. By Registering to use our website, you
            consent to our use of cookies.
          </p>
        </section>
      </main>

      <footer className='bg-trans_bluish p-4 mt-10 text-center'>
        <p>&copy; 2024 ChemGenie. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TermsPolicy;
