export default function LibraryPage() {
  return (
    <div className="w-full">
      <div className="mt-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Elektron kutubxona</h1>
          <p className="text-gray-600">O'quv materiallari va kitoblar</p>
        </div>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Kutubxona</h3>
          <p className="text-gray-500 mb-4">Hozircha kutubxona ma'lumotlari mavjud emas</p>
          <p className="text-sm text-gray-400">Tez orada bu sahifa to'ldiriladi</p>
        </div>
      </div>
    </div>
  );
} 