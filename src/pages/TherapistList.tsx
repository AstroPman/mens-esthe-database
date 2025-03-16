import React from 'react';
import { TherapistCard } from '../components/TherapistCard';
import { FilterPanel } from '../components/FilterPanel';
import type { Therapist, FilterOptions } from '../types';

const ITEMS_PER_PAGE_OPTIONS = [12, 24, 36];

export function TherapistList() {
  const [itemsPerPage, setItemsPerPage] = React.useState(12);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [therapists, setTherapists] = React.useState<Therapist[]>([]);
  const [filters, setFilters] = React.useState<FilterOptions>({
    ageRange: [18, 50],
    heightRange: [140, 180],
    braSize: [],
    minScore: 0,
    minReviews: 0,
    searchQuery: '',
    salon: '',
    area: '',
    services: {
      skr: false,
      hj: false,
      f: false,
      nn: false,
      ns: false
    },
    includeLargerCups: false
  });

  React.useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setTherapists(data.therapists))
      .catch(error => console.error('Error loading therapist data:', error));
  }, []);

  const filteredTherapists = React.useMemo(() => {
    return therapists.filter(therapist => {
      const matchesSearch = therapist.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                          therapist.salon_name.toLowerCase().includes(filters.searchQuery.toLowerCase());
      const matchesAge = therapist.age >= filters.ageRange[0] && therapist.age <= filters.ageRange[1];
      const matchesHeight = therapist.height >= filters.heightRange[0] && therapist.height <= filters.heightRange[1];
      const matchesReviews = therapist.reviews >= filters.minReviews;
      const matchesScore = therapist.score >= filters.minScore;
      const matchesSalon = !filters.salon || therapist.salon_name.toLowerCase().includes(filters.salon.toLowerCase());
      const matchesArea = !filters.area || therapist.area.toLowerCase().includes(filters.area.toLowerCase());
      
      // Check bra size including the "larger cups" option
      const matchesBraSize = filters.braSize.length === 0 || 
        filters.braSize.includes(therapist.bra_size) ||
        (filters.includeLargerCups && therapist.bra_size > 'I');

      // Check if any selected service is available
      const hasSelectedServices = Object.entries(filters.services).some(([key, isSelected]) => {
        if (!isSelected) return false;
        return therapist[key as keyof typeof filters.services] > 0;
      });
      const matchesServices = !Object.values(filters.services).some(v => v) || hasSelectedServices;

      return matchesSearch && 
             matchesAge && 
             matchesHeight && 
             matchesBraSize && 
             matchesScore && 
             matchesSalon && 
             matchesArea &&
             matchesReviews &&
             matchesServices;
    });
  }, [therapists, filters]);

  const paginatedTherapists = filteredTherapists.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredTherapists.length / itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <FilterPanel filters={filters} onFilterChange={setFilters} />
        </div>
        
        <div className="lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              セラピスト一覧 ({filteredTherapists.length}名)
            </h2>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-gray-700 text-white rounded-lg px-3 py-2"
            >
              {ITEMS_PER_PAGE_OPTIONS.map((num) => (
                <option key={num} value={num}>
                  {num}件表示
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedTherapists.map((therapist) => (
              <TherapistCard key={therapist.id} therapist={therapist} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === page
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}