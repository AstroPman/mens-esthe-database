import React from 'react';
import { Search, Sliders, Building2, Star, Ruler } from 'lucide-react';
import type { FilterOptions } from '../types';

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const BRA_SIZES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const SERVICES = [
  { key: 'skr' as const, label: 'SKR' },
  { key: 'hj' as const, label: 'HJ' },
  { key: 'f' as const, label: 'F' },
  { key: 'nn' as const, label: 'NN' },
  { key: 'ns' as const, label: 'NS' },
];

export function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Sliders className="w-5 h-5 text-purple-400" />
        <h2 className="text-xl font-semibold text-white">フィルター</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            検索
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
              className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              placeholder="セラピスト名を検索..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
            <Building2 className="w-4 h-4 mr-2" />
            サロン名
          </label>
          <input
            type="text"
            value={filters.salon}
            onChange={(e) => onFilterChange({ ...filters, salon: e.target.value })}
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            placeholder="サロン名を入力..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
            <Building2 className="w-4 h-4 mr-2" />
            エリア
          </label>
          <input
            type="text"
            value={filters.area}
            onChange={(e) => onFilterChange({ ...filters, area: e.target.value })}
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            placeholder="エリアを入力..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            年齢
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              value={filters.ageRange[0]}
              onChange={(e) => onFilterChange({
                ...filters,
                ageRange: [Number(e.target.value), filters.ageRange[1]]
              })}
              className="w-24 bg-gray-700 text-white rounded-lg px-3 py-2"
              placeholder="最小"
              min="18"
              max={filters.ageRange[1]}
            />
            <span className="text-gray-400">〜</span>
            <input
              type="number"
              value={filters.ageRange[1]}
              onChange={(e) => onFilterChange({
                ...filters,
                ageRange: [filters.ageRange[0], Number(e.target.value)]
              })}
              className="w-24 bg-gray-700 text-white rounded-lg px-3 py-2"
              placeholder="最大"
              min={filters.ageRange[0]}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <Ruler className="w-4 h-4 inline mr-2" />
            身長
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              value={filters.heightRange[0]}
              onChange={(e) => onFilterChange({
                ...filters,
                heightRange: [Number(e.target.value), filters.heightRange[1]]
              })}
              className="w-24 bg-gray-700 text-white rounded-lg px-3 py-2"
              placeholder="最小"
              min="140"
              max={filters.heightRange[1]}
            />
            <span className="text-gray-400">〜</span>
            <input
              type="number"
              value={filters.heightRange[1]}
              onChange={(e) => onFilterChange({
                ...filters,
                heightRange: [filters.heightRange[0], Number(e.target.value)]
              })}
              className="w-24 bg-gray-700 text-white rounded-lg px-3 py-2"
              placeholder="最大"
              min={filters.heightRange[0]}
            />
            <span className="text-gray-400">cm</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            カップサイズ
          </label>
          <div className="grid grid-cols-4 gap-2">
            {BRA_SIZES.map((size) => (
              <label key={size} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.braSize.includes(size)}
                  onChange={(e) => {
                    const newSizes = e.target.checked
                      ? [...filters.braSize, size]
                      : filters.braSize.filter(s => s !== size);
                    onFilterChange({ ...filters, braSize: newSizes });
                  }}
                  className="rounded border-gray-600 text-purple-500 focus:ring-purple-500 bg-gray-700"
                />
                <span className="ml-2 text-gray-300">{size}</span>
              </label>
            ))}
          </div>
          <label className="flex items-center mt-2">
            <input
              type="checkbox"
              checked={filters.includeLargerCups}
              onChange={(e) => onFilterChange({
                ...filters,
                includeLargerCups: e.target.checked
              })}
              className="rounded border-gray-600 text-purple-500 focus:ring-purple-500 bg-gray-700"
            />
            <span className="ml-2 text-gray-300">Iカップ以上も含む</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            最低評価点
          </label>
          <input
            type="range"
            value={filters.minScore}
            onChange={(e) => onFilterChange({
              ...filters,
              minScore: Number(e.target.value)
            })}
            className="w-full accent-purple-500"
            min="0"
            max="100"
            step="1"
          />
          <div className="text-gray-400 text-sm">{filters.minScore}点</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
            <Star className="w-4 h-4 mr-2" />
            最低レビュー数
          </label>
          <input
            type="number"
            value={filters.minReviews}
            onChange={(e) => onFilterChange({
              ...filters,
              minReviews: Number(e.target.value)
            })}
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2"
            min="0"
            placeholder="最低レビュー数を入力..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            サービス
          </label>
          <div className="space-y-2">
            {SERVICES.map(({ key, label }) => (
              <label key={key} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.services[key]}
                  onChange={(e) => onFilterChange({
                    ...filters,
                    services: {
                      ...filters.services,
                      [key]: e.target.checked
                    }
                  })}
                  className="rounded border-gray-600 text-purple-500 focus:ring-purple-500 bg-gray-700"
                />
                <span className="ml-2 text-gray-300">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}