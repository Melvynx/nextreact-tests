import type { ReactElement } from 'react';
import { describe, test } from 'vitest';
import { Dashboard } from '../../components/dashboard/Dashboard';
import { setup } from '../../test/setup';

const Wrapper = () => {
  return <></>;
};

const customRender = (ui: ReactElement) => setup(ui, { wrapper: Wrapper });

describe('Dashboard', () => {
  test('toggle dark mode update the dashboard colors', async () => {
    const { user } = customRender(<Dashboard />);

    // 🦁 Toggle le dark mode et vérifier que le text à changer
  });
});
