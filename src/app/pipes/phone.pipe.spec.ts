import { PhonesPipe } from './phones.pipe';

describe('PhonesPipe', () => {
  let pipe: PhonesPipe;

  beforeEach(() => {
    pipe = new PhonesPipe();
  });

  it('should format a single 9-digit phone number', () => {
    const result = pipe.transform(['123456789']);
    expect(result).toBe('123-456-789');
  });

  it('should remove spaces and format correctly', () => {
    const result = pipe.transform(['61 123 45 67']);
    expect(result).toBe('611-234-567');
  });

  it('should format multiple phone numbers and join them with comma', () => {
    const result = pipe.transform(['123456789', '987654321']);
    expect(result).toBe('123-456-789, 987-654-321');
  });

  it('should handle longer numbers by grouping digits into threes', () => {
    const result = pipe.transform(['123456789012']);
    expect(result).toBe('123-456-789-012');
  });

  it('should return empty string if array is empty', () => {
    const result = pipe.transform([]);
    expect(result).toBe('');
  });

  it('should return empty string if input is null or undefined', () => {
    expect(pipe.transform(null as any)).toBe('');
    expect(pipe.transform(undefined as any)).toBe('');
  });
});
