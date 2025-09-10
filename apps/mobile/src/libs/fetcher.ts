import { appConfig } from '@/config/app.config';
import { TFileData } from '@/types/file';

const handleResponse = async <T>(res: Response) => {
  const resJson = await res.json();
  if (!res.ok) {
    throw new Error(resJson.error || 'Unknown error');
  }

  return resJson.data as T;
};

export type Fetcher = ReturnType<typeof createFetcher>;

export const createBodyWithFiles = (jsonData: Record<string, any>, files: TFileData[]) => {
  let filesPathIndexes: { [path: string]: number[][] } | undefined = undefined;
  const body = new FormData();
  body.append('body', JSON.stringify(jsonData));

  files.forEach(({ indexes, field, file, blob, path }) => {
    const fileOrBlob = file ?? blob;
    const isFile = fileOrBlob && 'name' in fileOrBlob;
    body.append('files.' + (field ?? path), fileOrBlob, isFile ? fileOrBlob.name : undefined);
    if (indexes && path) {
      filesPathIndexes = filesPathIndexes || {};
      filesPathIndexes[path] = filesPathIndexes[path] || [];
      filesPathIndexes[path].push(indexes);
    }
  });
  if (filesPathIndexes) {
    body.append('filesPathIndexes', JSON.stringify(filesPathIndexes));
  }
  return body;
};

export const createFetcher = (apiUrl: string) => {
  const fetcher = (path: string, init?: RequestInit) => {
    return fetch(`${apiUrl}${path}`, init);
  };

  return {
    get: async <T>(path: string, init?: RequestInit): Promise<T> => {
      const res = await fetcher(path, {
        ...init,
        method: 'GET',
        credentials: 'include',
        headers: {
          ...init?.headers,
        },
      });
      return handleResponse<T>(res);
    },
    post: async <T>(path: string, data?: any, init?: RequestInit): Promise<T> => {
      const contentType = data instanceof FormData ? 'multipart/form-data' : 'application/json';

      const contentTypeHeader =
        contentType === 'application/json' ? { 'Content-Type': contentType } : undefined;

      const res = await fetcher(path, {
        ...init,
        method: 'POST',
        credentials: 'include',
        body: contentType === 'application/json' ? JSON.stringify(data) : data,
        headers: {
          ...init?.headers,
          ...contentTypeHeader,
        },
      });

      return handleResponse(res);
    },
    patch: async <T>(path: string, data?: any, init?: RequestInit): Promise<T> => {
      const contentType = data instanceof FormData ? 'multipart/form-data' : 'application/json';
      const res = await fetcher(path, {
        ...init,
        method: 'PATCH',
        body: contentType === 'application/json' ? JSON.stringify(data) : data,
        credentials: 'include',
        headers: {
          ...init?.headers,
          ...(contentType === 'application/json' ? { 'Content-Type': contentType } : undefined),
        },
      });

      return handleResponse(res);
    },
    delete: async <T>(path: string, init?: RequestInit): Promise<T> => {
      const res = await fetcher(path, {
        ...init,
        method: 'DELETE',
        credentials: 'include',
      });

      return handleResponse(res);
    },
  };
};

export const fetcher = createFetcher(appConfig.apiUrl);
