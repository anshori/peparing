-- Enable PostGIS Extension
CREATE EXTENSION postgis;
CREATE EXTENSION postgis_topology;

-- Buat tabel data_point
CREATE TABLE data_point (
	gid integer NOT NULL,
	id character varying(255) DEFAULT ''::character varying NOT NULL,
	geom geometry(Point,4326),
	enumerator character varying(255) DEFAULT ''::character varying NOT NULL,
	dusun character varying(255) DEFAULT ''::character varying NOT NULL,
	desa character varying(255) DEFAULT ''::character varying NOT NULL,
	kecamatan character varying(255) DEFAULT ''::character varying NOT NULL,
	kabkot character varying(255) DEFAULT ''::character varying NOT NULL,
	koordinat_info character varying(255) DEFAULT ''::character varying NOT NULL,
	ketinggian character varying(255) DEFAULT ''::character varying NOT NULL,
	foto_nama character varying(255) DEFAULT ''::character varying NOT NULL,
	foto_arahhadap character varying(255) DEFAULT ''::character varying NOT NULL,
	foto_info character varying(255) DEFAULT ''::character varying NOT NULL,
	tanggal_kejadian character varying(255) DEFAULT ''::character varying NOT NULL,
	jam_kejadian character varying(255) DEFAULT ''::character varying NOT NULL,
	hari_pasaran character varying(255) DEFAULT ''::character varying NOT NULL,
	tanggal_input character varying(255) DEFAULT ''::character varying NOT NULL,
	tanggal_update character varying(255) DEFAULT ''::character varying NOT NULL
);
ALTER TABLE public.data_point OWNER TO postgres;
COMMENT ON TABLE data_point IS 'DATA POINT';
CREATE SEQUENCE data_point_gid_seq
	START WITH 1
	INCREMENT BY 1
	NO MINVALUE
	NO MAXVALUE
	CACHE 1;
ALTER TABLE public.data_point_gid_seq OWNER TO postgres;
ALTER SEQUENCE data_point_gid_seq OWNED BY data_point.gid;
ALTER TABLE ONLY data_point ALTER COLUMN gid SET DEFAULT nextval('data_point_gid_seq'::regclass);
ALTER TABLE ONLY data_point ADD CONSTRAINT data_point_pkey PRIMARY KEY (gid);
CREATE INDEX data_point_geom_gist ON data_point USING gist (geom);


-- Buat tabel data_polygon
CREATE TABLE data_polygon (
	gid integer NOT NULL,
	id character varying(255) DEFAULT ''::character varying NOT NULL,
	geom geometry(Polygon,4326),
	enumerator character varying(255) DEFAULT ''::character varying NOT NULL,
	material_longsor character varying(255) DEFAULT ''::character varying NOT NULL,
	tipe_batuan character varying(255) DEFAULT ''::character varying NOT NULL,
	proses_longsor character varying(255) DEFAULT ''::character varying NOT NULL,
	kecepatan_luncuran character varying(255) DEFAULT ''::character varying NOT NULL,
	kemiringan_lereng character varying(255) DEFAULT ''::character varying NOT NULL,
	penggunaanlahan character varying(255) DEFAULT ''::character varying NOT NULL,
	tipe_vegetasi character varying(255) DEFAULT ''::character varying NOT NULL,
	penyebab_longsor character varying(255) DEFAULT ''::character varying NOT NULL,
	panjang_m_longsor character varying(255) DEFAULT ''::character varying NOT NULL,
	lebar_m_longsor character varying(255) DEFAULT ''::character varying NOT NULL,
	kedalaman_m_longsor character varying(255) DEFAULT ''::character varying NOT NULL,
	volume_m3 character varying(255) DEFAULT ''::character varying NOT NULL,
	tanggal_input character varying(255) DEFAULT ''::character varying NOT NULL,
	tanggal_update character varying(255) DEFAULT ''::character varying NOT NULL
);
ALTER TABLE public.data_polygon OWNER TO postgres;
COMMENT ON TABLE data_polygon IS 'DATA POLYGON';
CREATE SEQUENCE data_polygon_gid_seq
	START WITH 1
	INCREMENT BY 1
	NO MINVALUE
	NO MAXVALUE
	CACHE 1;
ALTER TABLE public.data_polygon_gid_seq OWNER TO postgres;
ALTER SEQUENCE data_polygon_gid_seq OWNED BY data_polygon.gid;
ALTER TABLE ONLY data_polygon ALTER COLUMN gid SET DEFAULT nextval('data_polygon_gid_seq'::regclass);
ALTER TABLE ONLY data_polygon ADD CONSTRAINT data_polygon_pkey PRIMARY KEY (gid);
CREATE INDEX data_polygon_geom_gist ON data_polygon USING gist (geom);