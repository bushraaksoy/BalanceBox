import { useEffect, useState } from 'react';
import { IoCheckmark } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router';
import SubpageLayout from '../layouts/SubpageLayout';
import { currencies, themes } from '../constants/preferences';
import { usePreferences } from '../context/PreferencesContext';

const choiceClass = (selected) =>
    `flex w-full items-center justify-between px-4 py-3 text-left text-sm ${
        selected ? 'font-medium' : ''
    }`;

const Settings = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const currencyPage = pathname.endsWith('/currency');
    const { theme, setTheme, currency, setCurrency } = usePreferences();
    const saved = currencyPage ? currency : theme;
    const [draft, setDraft] = useState(saved);

    useEffect(() => {
        setDraft(saved);
    }, [saved, currencyPage]);

    const save = () => {
        if (currencyPage) setCurrency(draft);
        else setTheme(draft);
        navigate('/account');
    };

    return (
        <SubpageLayout heading={currencyPage ? 'Currency' : 'Appearance'}>
            <div className="flex flex-col gap-4">
                <div className="overflow-hidden rounded-2xl border border-[#E8E9ED] bg-white text-[#171717]">
                    {currencyPage
                        ? currencies.map((item) => (
                              <button
                                  key={item.code}
                                  type="button"
                                  onClick={() => setDraft(item.code)}
                                  className={`${choiceClass(draft === item.code)} border-b border-[#E8E9ED] last:border-0`}
                              >
                                  <span>
                                      {item.symbol} {item.label}
                                  </span>
                                  {draft === item.code && (
                                      <IoCheckmark className="text-[#E6B33D]" size={18} />
                                  )}
                              </button>
                          ))
                        : themes.map((item) => (
                              <button
                                  key={item.id}
                                  type="button"
                                  onClick={() => setDraft(item.id)}
                                  className={`${choiceClass(draft === item.id)} border-b border-[#E8E9ED] last:border-0`}
                              >
                                  {item.label}
                                  {draft === item.id && (
                                      <IoCheckmark className="text-[#E6B33D]" size={18} />
                                  )}
                              </button>
                          ))}
                </div>
                <button
                    type="button"
                    onClick={save}
                    disabled={draft === saved}
                    className="w-full rounded-full bg-[#E6B33D] py-3 font-medium text-[#171717] disabled:opacity-50"
                >
                    Save
                </button>
            </div>
        </SubpageLayout>
    );
};

export default Settings;
