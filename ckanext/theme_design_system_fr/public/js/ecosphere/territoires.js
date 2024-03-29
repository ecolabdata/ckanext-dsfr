var territoires = {
    "title": "registre des territoires pour le projet Ecosphères",
    "description": "Registre des territoires pour le projet Ecosphères.\n4 types de territoires sont définies:\n  - les régions de métropole\n  - les départements de métropole\n  - les espaces d'outre-mer quel que soit leur statut\n  - les zones maritimes, 1 par espace d'outre-mer et 3 en métropole (Manche-Mer-du-Nord, Atlantique et Méditerranée)\nLes régions et les espaces d'outre mer forment une partition du territoire français terrestre.\nChaque région de métropole se décompose en un ensemble de départements de métropole.\n",
    "modified": "2022-07-20",
    "creator": "Benoit DAVID, MTECT/CGDD/SRI/Ecolab",
    "$schema": {
        "$id": "https://github.com/benoitdavidfr/territoiresecospheres/blob/main/territoires.yaml#/$schema",
        "definitions": {
            "spatial": {
                "description": "boîte englobante sous la forme DCMI Box Encoding Scheme encodé en Yaml/JSON et en WGS84",
                "type": "object",
                "additionalProperties": false,
                "required": [
                    "westlimit",
                    "southlimit",
                    "eastlimit",
                    "northlimit"
                ],
                "properties": {
                    "westlimit": {
                        "description": "longitude minimum en degrés décimaux en WGS84",
                        "type": "number"
                    },
                    "southlimit": {
                        "description": "latitude minimum en degrés décimaux en WGS84",
                        "type": "number"
                    },
                    "eastlimit": {
                        "description": "longitude maximum en degrés décimaux en WGS84",
                        "type": "number"
                    },
                    "northlimit": {
                        "description": "latitude maximum en degrés décimaux en WGS84",
                        "type": "number"
                    }
                }
            },
            "région": {
                "description": "structure commune aux régions de métrople et aux territoires d'outre-mer",
                "type": "object",
                "additionalProperties": false,
                "required": [
                    "name",
                    "spatial"
                ],
                "properties": {
                    "name": {
                        "description": "le nom officiel en français",
                        "type": "string"
                    },
                    "uriUE": {
                        "description": "URI de l'Union Européenne",
                        "type": "string"
                    },
                    "spatial": {
                        "description": "boîte englobante",
                        "$ref": "#/definitions/spatial"
                    }
                }
            }
        },
        "type": "object",
        "additionalProperties": false,
        "properties": {
            "title": {
                "description": "titre du document",
                "type": "string"
            },
            "description": {
                "description": "commentaire sur le document",
                "type": "string"
            },
            "modified": {
                "description": "date de dernière modification du document",
                "type": "string"
            },
            "creator": {
                "description": "auteur du document",
                "type": "string"
            },
            "$schema": {
                "description": "schema JSON du document",
                "oneOf": [
                    {
                        "$ref": "http://json-schema.org/schema#"
                    },
                    {
                        "type": "string"
                    }
                ]
            },
            "régions-métrople": {
                "description": "dictionnaire régions de métropole plus la Corse indexées sur leur code ISO 3166-2 sur 3 caractères",
                "type": "object",
                "additionalProperties": false,
                "patternProperties": {
                    "^[A-Z]{3}$": {
                        "$ref": "#/definitions/région"
                    }
                }
            },
            "départements-métropole": {
                "description": "dictionnaire des départements de métropole indexés sur leur code Insee précédé de la letttre 'D'",
                "type": "object",
                "additionalProperties": false,
                "patternProperties": {
                    "^D([0-9]{2}|2[AB])$": {
                        "type": "object",
                        "additionalProperties": false,
                        "required": [
                            "name",
                            "codeRégion",
                            "uriUE",
                            "spatial"
                        ],
                        "properties": {
                            "name": {
                                "description": "le nom officiel en français",
                                "type": "string"
                            },
                            "codeRégion": {
                                "description": "code à 3 caractères de la région à laquelle le département appartient",
                                "type": "string",
                                "pattern": "^[A-Z]{3}$"
                            },
                            "uriUE": {
                                "description": "URI de l'Union Européenne",
                                "type": "string"
                            },
                            "spatial": {
                                "description": "boîte englobante",
                                "$ref": "#/definitions/spatial"
                            }
                        }
                    }
                }
            },
            "outre-mer": {
                "description": "dictionnaire des espaces d'outre-mer quels que soit leur statut, indexés par leur coude ISO 3166-1 sur 3 caractères.  \nComprend les départements d'outre-mer, les collectivités d'outre-mer, la Nouvelle-Calédonie et les TAAF.\n",
                "type": "object",
                "additionalProperties": false,
                "patternProperties": {
                    "^[A-Z]{3}$": {
                        "$ref": "#/definitions/région"
                    }
                }
            },
            "zones-maritimes": {
                "description": "Dictionnaire des zones maritimes, 1 par esapce outre-mer et 3 en métropole. Leur extension géographique correspond\nà celle de la ZEE.\n",
                "type": "object",
                "additionalProperties": false,
                "patternProperties": {
                    "^[-A-Za-z]+$": {
                        "$ref": "#/definitions/région"
                    }
                }
            },
            "eof": {
                "description": "fin de fichier",
                "type": "null"
            }
        }
    },
    "régions-métrople": {
        "ARA": {
            "name": "Auvergne-Rhône-Alpes",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_RG_ARA",
            "spatial": {
                "westlimit": 2.06,
                "southlimit": 44.11,
                "eastlimit": 7.19,
                "northlimit": 46.81
            }
        },
        "BFC": {
            "name": "Bourgogne-Franche-Comté",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_RG_BFC",
            "spatial": {
                "westlimit": 2.84,
                "southlimit": 46.15,
                "eastlimit": 7.15,
                "northlimit": 48.41
            }
        },
        "BRE": {
            "name": "Bretagne",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_RG_BRE",
            "spatial": {
                "westlimit": -5.15,
                "southlimit": 47.27,
                "eastlimit": -1.01,
                "northlimit": 48.91
            }
        },
        "COR": {
            "name": "Corse",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_RG_COR",
            "spatial": {
                "westlimit": 8.53,
                "southlimit": 41.33,
                "eastlimit": 9.57,
                "northlimit": 43.03
            }
        },
        "CVL": {
            "name": "Centre-Val de Loire",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_RG_CVL",
            "spatial": {
                "westlimit": 0.05,
                "southlimit": 46.34,
                "eastlimit": 3.13,
                "northlimit": 48.95
            }
        },
        "GES": {
            "name": "Grand Est",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_RG_GES",
            "spatial": {
                "westlimit": 3.38,
                "southlimit": 47.42,
                "eastlimit": 8.24,
                "northlimit": 50.17
            }
        },
        "HDF": {
            "name": "Hauts-de-France",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_RG_HDF",
            "spatial": {
                "westlimit": 1.38,
                "southlimit": 48.83,
                "eastlimit": 4.26,
                "northlimit": 51.09
            }
        },
        "IDF": {
            "name": "Île-de-France",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_RG_IDF",
            "spatial": {
                "westlimit": 1.44,
                "southlimit": 48.12,
                "eastlimit": 3.56,
                "northlimit": 49.25
            }
        },
        "NAQ": {
            "name": "Nouvelle-Aquitaine",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_RG_NAQ",
            "spatial": {
                "westlimit": -1.8,
                "southlimit": 42.77,
                "eastlimit": 2.62,
                "northlimit": 47.18
            }
        },
        "NOR": {
            "name": "Normandie",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_RG_NOR",
            "spatial": {
                "westlimit": -1.95,
                "southlimit": 48.17,
                "eastlimit": 1.81,
                "northlimit": 50.08
            }
        },
        "OCC": {
            "name": "Occitanie",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_RG_OCC",
            "spatial": {
                "westlimit": -0.33,
                "southlimit": 42.33,
                "eastlimit": 4.85,
                "northlimit": 45.05
            }
        },
        "PAC": {
            "name": "Provence-Alpes-Côte d'Azur",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_RG_PAC",
            "spatial": {
                "westlimit": 4.23,
                "southlimit": 42.98,
                "eastlimit": 7.72,
                "northlimit": 45.13
            }
        },
        "PDL": {
            "name": "Pays de la Loire",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_RG_PDL",
            "spatial": {
                "westlimit": -2.63,
                "southlimit": 46.26,
                "eastlimit": 0.92,
                "northlimit": 48.57
            }
        }
    },
    "départements-métropole": {
        "D01": {
            "name": "Ain",
            "codeRégion": "ARA",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_001",
            "spatial": {
                "westlimit": 4.72,
                "southlimit": 45.61,
                "eastlimit": 6.18,
                "northlimit": 46.52
            }
        },
        "D02": {
            "name": "Aisne",
            "codeRégion": "HDF",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_002",
            "spatial": {
                "westlimit": 2.95,
                "southlimit": 48.83,
                "eastlimit": 4.26,
                "northlimit": 50.07
            }
        },
        "D2A": {
            "name": "Corse-du-Sud",
            "codeRégion": "COR",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_02A",
            "spatial": {
                "westlimit": 8.53,
                "southlimit": 41.33,
                "eastlimit": 9.41,
                "northlimit": 42.39
            }
        },
        "D2B": {
            "name": "Haute-Corse",
            "codeRégion": "COR",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_02B",
            "spatial": {
                "westlimit": 8.57,
                "southlimit": 41.83,
                "eastlimit": 9.57,
                "northlimit": 43.03
            }
        },
        "D03": {
            "name": "Allier",
            "codeRégion": "ARA",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_003",
            "spatial": {
                "westlimit": 2.27,
                "southlimit": 45.93,
                "eastlimit": 4.01,
                "northlimit": 46.81
            }
        },
        "D04": {
            "name": "Alpes-de-Haute-Provence",
            "codeRégion": "PAC",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_004",
            "spatial": {
                "westlimit": 5.49,
                "southlimit": 43.66,
                "eastlimit": 6.97,
                "northlimit": 44.66
            }
        },
        "D05": {
            "name": "Hautes-Alpes",
            "codeRégion": "PAC",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_005",
            "spatial": {
                "westlimit": 5.41,
                "southlimit": 44.18,
                "eastlimit": 7.08,
                "northlimit": 45.13
            }
        },
        "D06": {
            "name": "Alpes-Maritimes",
            "codeRégion": "PAC",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_006",
            "spatial": {
                "westlimit": 6.63,
                "southlimit": 43.48,
                "eastlimit": 7.72,
                "northlimit": 44.37
            }
        },
        "D07": {
            "name": "Ardèche",
            "codeRégion": "ARA",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_007",
            "spatial": {
                "westlimit": 3.86,
                "southlimit": 44.26,
                "eastlimit": 4.89,
                "northlimit": 45.37
            }
        },
        "D08": {
            "name": "Ardennes",
            "codeRégion": "GES",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_008",
            "spatial": {
                "westlimit": 4.02,
                "southlimit": 49.22,
                "eastlimit": 5.4,
                "northlimit": 50.17
            }
        },
        "D09": {
            "name": "Ariège",
            "codeRégion": "OCC",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_009",
            "spatial": {
                "westlimit": 0.82,
                "southlimit": 42.57,
                "eastlimit": 2.18,
                "northlimit": 43.32
            }
        },
        "D10": {
            "name": "Aube",
            "codeRégion": "GES",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_010",
            "spatial": {
                "westlimit": 3.38,
                "southlimit": 47.92,
                "eastlimit": 4.87,
                "northlimit": 48.72
            }
        },
        "D11": {
            "name": "Aude",
            "codeRégion": "OCC",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_011",
            "spatial": {
                "westlimit": 1.68,
                "southlimit": 42.64,
                "eastlimit": 3.25,
                "northlimit": 43.47
            }
        },
        "D12": {
            "name": "Aveyron",
            "codeRégion": "OCC",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_012",
            "spatial": {
                "westlimit": 1.83,
                "southlimit": 43.69,
                "eastlimit": 3.46,
                "northlimit": 44.95
            }
        },
        "D13": {
            "name": "Bouches-du-Rhône",
            "codeRégion": "PAC",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_013",
            "spatial": {
                "westlimit": 4.23,
                "southlimit": 43.15,
                "eastlimit": 5.82,
                "northlimit": 43.93
            }
        },
        "D14": {
            "name": "Calvados",
            "codeRégion": "NOR",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_014",
            "spatial": {
                "westlimit": -1.16,
                "southlimit": 48.75,
                "eastlimit": 0.45,
                "northlimit": 49.43
            }
        },
        "D15": {
            "name": "Cantal",
            "codeRégion": "ARA",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_015",
            "spatial": {
                "westlimit": 2.06,
                "southlimit": 44.61,
                "eastlimit": 3.38,
                "northlimit": 45.49
            }
        },
        "D16": {
            "name": "Charente",
            "codeRégion": "NAQ",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_016",
            "spatial": {
                "westlimit": -0.47,
                "southlimit": 45.19,
                "eastlimit": 0.95,
                "northlimit": 46.15
            }
        },
        "D17": {
            "name": "Charente-Maritime",
            "codeRégion": "NAQ",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_017",
            "spatial": {
                "westlimit": -1.57,
                "southlimit": 45.08,
                "eastlimit": 0.01,
                "northlimit": 46.38
            }
        },
        "D18": {
            "name": "Cher",
            "codeRégion": "CVL",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_018",
            "spatial": {
                "westlimit": 1.77,
                "southlimit": 46.42,
                "eastlimit": 3.08,
                "northlimit": 47.63
            }
        },
        "D19": {
            "name": "Corrèze",
            "codeRégion": "NAQ",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_019",
            "spatial": {
                "westlimit": 1.22,
                "southlimit": 44.92,
                "eastlimit": 2.53,
                "northlimit": 45.77
            }
        },
        "D21": {
            "name": "Côte-d'Or",
            "codeRégion": "BFC",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_021",
            "spatial": {
                "westlimit": 4.06,
                "southlimit": 46.89,
                "eastlimit": 5.52,
                "northlimit": 48.04
            }
        },
        "D22": {
            "name": "Côtes d'Armor",
            "codeRégion": "BRE",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_022",
            "spatial": {
                "westlimit": -3.67,
                "southlimit": 48.03,
                "eastlimit": -1.9,
                "northlimit": 48.91
            }
        },
        "D23": {
            "name": "Creuse",
            "codeRégion": "NAQ",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_023",
            "spatial": {
                "westlimit": 1.37,
                "southlimit": 45.66,
                "eastlimit": 2.62,
                "northlimit": 46.46
            }
        },
        "D24": {
            "name": "Dordogne",
            "codeRégion": "NAQ",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_024",
            "spatial": {
                "westlimit": -0.05,
                "southlimit": 44.57,
                "eastlimit": 1.45,
                "northlimit": 45.72
            }
        },
        "D25": {
            "name": "Doubs",
            "codeRégion": "BFC",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_025",
            "spatial": {
                "westlimit": 5.69,
                "southlimit": 46.55,
                "eastlimit": 7.07,
                "northlimit": 47.58
            }
        },
        "D26": {
            "name": "Drôme",
            "codeRégion": "ARA",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_026",
            "spatial": {
                "westlimit": 4.64,
                "southlimit": 44.11,
                "eastlimit": 5.84,
                "northlimit": 45.35
            }
        },
        "D27": {
            "name": "Eure",
            "codeRégion": "NOR",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_027",
            "spatial": {
                "westlimit": 0.29,
                "southlimit": 48.66,
                "eastlimit": 1.81,
                "northlimit": 49.49
            }
        },
        "D28": {
            "name": "Eure-et-Loir",
            "codeRégion": "CVL",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_028",
            "spatial": {
                "westlimit": 0.75,
                "southlimit": 47.95,
                "eastlimit": 2,
                "northlimit": 48.95
            }
        },
        "D29": {
            "name": "Finistère",
            "codeRégion": "BRE",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_029",
            "spatial": {
                "westlimit": -5.15,
                "southlimit": 47.7,
                "eastlimit": -3.38,
                "northlimit": 48.76
            }
        },
        "D30": {
            "name": "Gard",
            "codeRégion": "OCC",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_030",
            "spatial": {
                "westlimit": 3.26,
                "southlimit": 43.46,
                "eastlimit": 4.85,
                "northlimit": 44.46
            }
        },
        "D31": {
            "name": "Haute-Garonne",
            "codeRégion": "OCC",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_031",
            "spatial": {
                "westlimit": 0.44,
                "southlimit": 42.68,
                "eastlimit": 2.05,
                "northlimit": 43.93
            }
        },
        "D32": {
            "name": "Gers",
            "codeRégion": "OCC",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_032",
            "spatial": {
                "westlimit": -0.29,
                "southlimit": 43.31,
                "eastlimit": 1.21,
                "northlimit": 44.09
            }
        },
        "D33": {
            "name": "Gironde",
            "codeRégion": "NAQ",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_033",
            "spatial": {
                "westlimit": -1.27,
                "southlimit": 44.19,
                "eastlimit": 0.32,
                "northlimit": 45.61
            }
        },
        "D34": {
            "name": "Hérault",
            "codeRégion": "OCC",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_034",
            "spatial": {
                "westlimit": 2.53,
                "southlimit": 43.21,
                "eastlimit": 4.2,
                "northlimit": 43.98
            }
        },
        "D35": {
            "name": "Ille-et-Vilaine",
            "codeRégion": "BRE",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_035",
            "spatial": {
                "westlimit": -2.29,
                "southlimit": 47.63,
                "eastlimit": -1.01,
                "northlimit": 48.73
            }
        },
        "D36": {
            "name": "Indre",
            "codeRégion": "CVL",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_036",
            "spatial": {
                "westlimit": 0.86,
                "southlimit": 46.34,
                "eastlimit": 2.21,
                "northlimit": 47.28
            }
        },
        "D37": {
            "name": "Indre-et-Loire ",
            "codeRégion": "CVL",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_037",
            "spatial": {
                "westlimit": 0.05,
                "southlimit": 46.73,
                "eastlimit": 1.37,
                "northlimit": 47.71
            }
        },
        "D38": {
            "name": "Isère",
            "codeRégion": "ARA",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_038",
            "spatial": {
                "westlimit": 4.74,
                "southlimit": 44.69,
                "eastlimit": 6.36,
                "northlimit": 45.89
            }
        },
        "D39": {
            "name": "Jura",
            "codeRégion": "BFC",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_039",
            "spatial": {
                "westlimit": 5.25,
                "southlimit": 46.26,
                "eastlimit": 6.21,
                "northlimit": 47.31
            }
        },
        "D40": {
            "name": "Landes",
            "codeRégion": "NAQ",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_040",
            "spatial": {
                "westlimit": -1.53,
                "southlimit": 43.48,
                "eastlimit": 0.14,
                "northlimit": 44.54
            }
        },
        "D41": {
            "name": "Loir-et-Cher",
            "codeRégion": "CVL",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_041",
            "spatial": {
                "westlimit": 0.58,
                "southlimit": 47.18,
                "eastlimit": 2.25,
                "northlimit": 48.14
            }
        },
        "D42": {
            "name": "Loire",
            "codeRégion": "ARA",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_042",
            "spatial": {
                "westlimit": 3.68,
                "southlimit": 45.23,
                "eastlimit": 4.77,
                "northlimit": 46.28
            }
        },
        "D43": {
            "name": "Haute-Loire",
            "codeRégion": "ARA",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_043",
            "spatial": {
                "westlimit": 3.08,
                "southlimit": 44.74,
                "eastlimit": 4.5,
                "northlimit": 45.43
            }
        },
        "D44": {
            "name": "Loire-Atlantique",
            "codeRégion": "PDL",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_044",
            "spatial": {
                "westlimit": -2.63,
                "southlimit": 46.86,
                "eastlimit": -0.94,
                "northlimit": 47.84
            }
        },
        "D45": {
            "name": "Loiret",
            "codeRégion": "CVL",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_045",
            "spatial": {
                "westlimit": 1.51,
                "southlimit": 47.48,
                "eastlimit": 3.13,
                "northlimit": 48.35
            }
        },
        "D46": {
            "name": "Lot",
            "codeRégion": "OCC",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_046",
            "spatial": {
                "westlimit": 0.98,
                "southlimit": 44.2,
                "eastlimit": 2.22,
                "northlimit": 45.05
            }
        },
        "D47": {
            "name": "Lot-et-Garonne",
            "codeRégion": "NAQ",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_047",
            "spatial": {
                "westlimit": -0.15,
                "southlimit": 43.97,
                "eastlimit": 1.08,
                "northlimit": 44.77
            }
        },
        "D48": {
            "name": "Lozère",
            "codeRégion": "OCC",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_048",
            "spatial": {
                "westlimit": 2.98,
                "southlimit": 44.1,
                "eastlimit": 4,
                "northlimit": 44.98
            }
        },
        "D49": {
            "name": "Maine-et-Loire",
            "codeRégion": "PDL",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_049",
            "spatial": {
                "westlimit": -1.36,
                "southlimit": 46.96,
                "eastlimit": 0.24,
                "northlimit": 47.81
            }
        },
        "D50": {
            "name": "Manche",
            "codeRégion": "NOR",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_050",
            "spatial": {
                "westlimit": -1.96,
                "southlimit": 48.45,
                "eastlimit": -0.73,
                "northlimit": 49.73
            }
        },
        "D51": {
            "name": "Marne",
            "codeRégion": "GES",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_051",
            "spatial": {
                "westlimit": 3.39,
                "southlimit": 48.51,
                "eastlimit": 5.04,
                "northlimit": 49.41
            }
        },
        "D52": {
            "name": "Haute-Marne",
            "codeRégion": "GES",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_052",
            "spatial": {
                "westlimit": 4.62,
                "southlimit": 47.57,
                "eastlimit": 5.9,
                "northlimit": 48.69
            }
        },
        "D53": {
            "name": "Mayenne",
            "codeRégion": "PDL",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_053",
            "spatial": {
                "westlimit": -1.24,
                "southlimit": 47.73,
                "eastlimit": -0.04,
                "northlimit": 48.57
            }
        },
        "D54": {
            "name": "Meurthe-et-Moselle",
            "codeRégion": "GES",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_054",
            "spatial": {
                "westlimit": 5.42,
                "southlimit": 48.34,
                "eastlimit": 7.13,
                "northlimit": 49.57
            }
        },
        "D55": {
            "name": "Meuse",
            "codeRégion": "GES",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_055",
            "spatial": {
                "westlimit": 4.88,
                "southlimit": 48.4,
                "eastlimit": 5.86,
                "northlimit": 49.62
            }
        },
        "D56": {
            "name": "Morbihan",
            "codeRégion": "BRE",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_056",
            "spatial": {
                "westlimit": -3.74,
                "southlimit": 47.27,
                "eastlimit": -2.03,
                "northlimit": 48.22
            }
        },
        "D57": {
            "name": "Moselle",
            "codeRégion": "GES",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_057",
            "spatial": {
                "westlimit": 5.89,
                "southlimit": 48.52,
                "eastlimit": 7.65,
                "northlimit": 49.52
            }
        },
        "D58": {
            "name": "Nièvre",
            "codeRégion": "BFC",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_058",
            "spatial": {
                "westlimit": 2.84,
                "southlimit": 46.65,
                "eastlimit": 4.24,
                "northlimit": 47.59
            }
        },
        "D59": {
            "name": "Nord",
            "codeRégion": "HDF",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_059",
            "spatial": {
                "westlimit": 2.08,
                "southlimit": 49.96,
                "eastlimit": 4.24,
                "northlimit": 51.09
            }
        },
        "D60": {
            "name": "Oise",
            "codeRégion": "HDF",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_060",
            "spatial": {
                "westlimit": 1.68,
                "southlimit": 49.06,
                "eastlimit": 3.17,
                "northlimit": 49.77
            }
        },
        "D61": {
            "name": "Orne",
            "codeRégion": "NOR",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_061",
            "spatial": {
                "westlimit": -0.87,
                "southlimit": 48.17,
                "eastlimit": 0.98,
                "northlimit": 48.98
            }
        },
        "D62": {
            "name": "Pas-de-Calais",
            "codeRégion": "HDF",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_062",
            "spatial": {
                "westlimit": 1.55,
                "southlimit": 50.01,
                "eastlimit": 3.19,
                "northlimit": 51.02
            }
        },
        "D63": {
            "name": "Puy-de-Dôme",
            "codeRégion": "ARA",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_063",
            "spatial": {
                "westlimit": 2.38,
                "southlimit": 45.28,
                "eastlimit": 3.99,
                "northlimit": 46.26
            }
        },
        "D64": {
            "name": "Pyrénées-Atlantiques",
            "codeRégion": "NAQ",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_064",
            "spatial": {
                "westlimit": -1.8,
                "southlimit": 42.77,
                "eastlimit": 0.03,
                "northlimit": 43.6
            }
        },
        "D65": {
            "name": "Hautes-Pyrénées",
            "codeRégion": "OCC",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_065",
            "spatial": {
                "westlimit": -0.33,
                "southlimit": 42.67,
                "eastlimit": 0.65,
                "northlimit": 43.62
            }
        },
        "D66": {
            "name": "Pyrénées-Orientales",
            "codeRégion": "OCC",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_066",
            "spatial": {
                "westlimit": 1.72,
                "southlimit": 42.33,
                "eastlimit": 3.18,
                "northlimit": 42.92
            }
        },
        "D67": {
            "name": "Bas-Rhin",
            "codeRégion": "GES",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_067",
            "spatial": {
                "westlimit": 6.94,
                "southlimit": 48.12,
                "eastlimit": 8.24,
                "northlimit": 49.08
            }
        },
        "D68": {
            "name": "Haut-Rhin",
            "codeRégion": "GES",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_068",
            "spatial": {
                "westlimit": 6.84,
                "southlimit": 47.42,
                "eastlimit": 7.63,
                "northlimit": 48.32
            }
        },
        "D69": {
            "name": "Rhône",
            "codeRégion": "ARA",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_069",
            "spatial": {
                "westlimit": 4.24,
                "southlimit": 45.45,
                "eastlimit": 5.17,
                "northlimit": 46.31
            }
        },
        "D70": {
            "name": "Haute-Saône",
            "codeRégion": "BFC",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_070",
            "spatial": {
                "westlimit": 5.36,
                "southlimit": 47.25,
                "eastlimit": 6.83,
                "northlimit": 48.03
            }
        },
        "D71": {
            "name": "Saône-et-Loire",
            "codeRégion": "BFC",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_071",
            "spatial": {
                "westlimit": 3.62,
                "southlimit": 46.15,
                "eastlimit": 5.47,
                "northlimit": 47.16
            }
        },
        "D72": {
            "name": "Sarthe",
            "codeRégion": "PDL",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_072",
            "spatial": {
                "westlimit": -0.45,
                "southlimit": 47.56,
                "eastlimit": 0.92,
                "northlimit": 48.49
            }
        },
        "D73": {
            "name": "Savoie",
            "codeRégion": "ARA",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_073",
            "spatial": {
                "westlimit": 5.62,
                "southlimit": 45.05,
                "eastlimit": 7.19,
                "northlimit": 45.94
            }
        },
        "D74": {
            "name": "Haute-Savoie",
            "codeRégion": "ARA",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_074",
            "spatial": {
                "westlimit": 5.8,
                "southlimit": 45.68,
                "eastlimit": 7.05,
                "northlimit": 46.41
            }
        },
        "D75": {
            "name": "Paris",
            "codeRégion": "IDF",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_075",
            "spatial": {
                "westlimit": 2.22,
                "southlimit": 48.81,
                "eastlimit": 2.47,
                "northlimit": 48.91
            }
        },
        "D76": {
            "name": "Seine-Maritime",
            "codeRégion": "NOR",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_076",
            "spatial": {
                "westlimit": 0.06,
                "southlimit": 49.25,
                "eastlimit": 1.8,
                "northlimit": 50.08
            }
        },
        "D77": {
            "name": "Seine-et-Marne",
            "codeRégion": "IDF",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_077",
            "spatial": {
                "westlimit": 2.39,
                "southlimit": 48.12,
                "eastlimit": 3.56,
                "northlimit": 49.12
            }
        },
        "D78": {
            "name": "Yvelines",
            "codeRégion": "IDF",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_078",
            "spatial": {
                "westlimit": 1.44,
                "southlimit": 48.43,
                "eastlimit": 2.23,
                "northlimit": 49.09
            }
        },
        "D79": {
            "name": "Deux-Sèvres",
            "codeRégion": "NAQ",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_079",
            "spatial": {
                "westlimit": -0.91,
                "southlimit": 45.96,
                "eastlimit": 0.23,
                "northlimit": 47.11
            }
        },
        "D80": {
            "name": "Somme",
            "codeRégion": "HDF",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_080",
            "spatial": {
                "westlimit": 1.38,
                "southlimit": 49.57,
                "eastlimit": 3.21,
                "northlimit": 50.37
            }
        },
        "D81": {
            "name": "Tarn",
            "codeRégion": "OCC",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_081",
            "spatial": {
                "westlimit": 1.53,
                "southlimit": 43.38,
                "eastlimit": 2.94,
                "northlimit": 44.21
            }
        },
        "D82": {
            "name": "Tarn-et-Garonne",
            "codeRégion": "OCC",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_082",
            "spatial": {
                "westlimit": 0.73,
                "southlimit": 43.76,
                "eastlimit": 2.01,
                "northlimit": 44.4
            }
        },
        "D83": {
            "name": "Var",
            "codeRégion": "PAC",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_083",
            "spatial": {
                "westlimit": 5.65,
                "southlimit": 42.98,
                "eastlimit": 6.94,
                "northlimit": 43.81
            }
        },
        "D84": {
            "name": "Vaucluse",
            "codeRégion": "PAC",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_084",
            "spatial": {
                "westlimit": 4.64,
                "southlimit": 43.65,
                "eastlimit": 5.76,
                "northlimit": 44.44
            }
        },
        "D85": {
            "name": "Vendée",
            "codeRégion": "PDL",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_085",
            "spatial": {
                "westlimit": -2.41,
                "southlimit": 46.26,
                "eastlimit": -0.53,
                "northlimit": 47.09
            }
        },
        "D86": {
            "name": "Vienne",
            "codeRégion": "NAQ",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_086",
            "spatial": {
                "westlimit": -0.11,
                "southlimit": 46.04,
                "eastlimit": 1.22,
                "northlimit": 47.18
            }
        },
        "D87": {
            "name": "Haute-Vienne",
            "codeRégion": "NAQ",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_087",
            "spatial": {
                "westlimit": 0.62,
                "southlimit": 45.43,
                "eastlimit": 1.92,
                "northlimit": 46.41
            }
        },
        "D88": {
            "name": "Vosges",
            "codeRégion": "GES",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_088",
            "spatial": {
                "westlimit": 5.39,
                "southlimit": 47.81,
                "eastlimit": 7.2,
                "northlimit": 48.52
            }
        },
        "D89": {
            "name": "Yonne",
            "codeRégion": "BFC",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_089",
            "spatial": {
                "westlimit": 2.84,
                "southlimit": 47.31,
                "eastlimit": 4.35,
                "northlimit": 48.41
            }
        },
        "D90": {
            "name": "Territoire de Belfort",
            "codeRégion": "BFC",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_090",
            "spatial": {
                "westlimit": 6.75,
                "southlimit": 47.43,
                "eastlimit": 7.15,
                "northlimit": 47.83
            }
        },
        "D91": {
            "name": "Essonne",
            "codeRégion": "IDF",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_091",
            "spatial": {
                "westlimit": 1.91,
                "southlimit": 48.28,
                "eastlimit": 2.59,
                "northlimit": 48.78
            }
        },
        "D92": {
            "name": "Hauts-de-Seine",
            "codeRégion": "IDF",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_092",
            "spatial": {
                "westlimit": 2.14,
                "southlimit": 48.72,
                "eastlimit": 2.34,
                "northlimit": 48.96
            }
        },
        "D93": {
            "name": "Seine-Saint-Denis",
            "codeRégion": "IDF",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_093",
            "spatial": {
                "westlimit": 2.28,
                "southlimit": 48.8,
                "eastlimit": 2.61,
                "northlimit": 49.02
            }
        },
        "D94": {
            "name": "Val-de-Marne",
            "codeRégion": "IDF",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_094",
            "spatial": {
                "westlimit": 2.3,
                "southlimit": 48.68,
                "eastlimit": 2.62,
                "northlimit": 48.87
            }
        },
        "D95": {
            "name": "Val-d'Oise",
            "codeRégion": "IDF",
            "uriUE": "http://publications.europa.eu/resource/authority/atu/FRA_DPT_095",
            "spatial": {
                "westlimit": 1.6,
                "southlimit": 48.9,
                "eastlimit": 2.6,
                "northlimit": 49.25
            }
        }
    },
    "outre-mer": {
        "GLP": {
            "name": "Guadeloupe",
            "uriUE": "http://publications.europa.eu/resource/authority/country/GLP",
            "spatial": {
                "westlimit": -61.81,
                "southlimit": 15.83,
                "eastlimit": -61,
                "northlimit": 16.52
            }
        },
        "MTQ": {
            "name": "Martinique",
            "uriUE": "http://publications.europa.eu/resource/authority/country/MTQ",
            "spatial": {
                "westlimit": -61.24,
                "southlimit": 14.38,
                "eastlimit": -60.8,
                "northlimit": 14.89
            }
        },
        "GUF": {
            "name": "Guyane",
            "uriUE": "http://publications.europa.eu/resource/authority/country/GUF",
            "spatial": {
                "westlimit": -54.61,
                "southlimit": 2.11,
                "eastlimit": -51.63,
                "northlimit": 5.75
            }
        },
        "REU": {
            "name": "Réunion",
            "uriUE": "http://publications.europa.eu/resource/authority/country/REU",
            "spatial": {
                "westlimit": 55.21,
                "southlimit": -21.4,
                "eastlimit": 55.84,
                "northlimit": -20.87
            }
        },
        "MYT": {
            "name": "Mayotte",
            "uriUE": "http://publications.europa.eu/resource/authority/country/MYT",
            "spatial": {
                "westlimit": 44.95,
                "southlimit": -13.08,
                "eastlimit": 45.31,
                "northlimit": -12.58
            }
        },
        "SPM": {
            "name": "Saint-Pierre-et-Miquelon",
            "uriUE": "http://publications.europa.eu/resource/authority/country/SPM",
            "spatial": {
                "westlimit": -56.52,
                "southlimit": 46.74,
                "eastlimit": -56.11,
                "northlimit": 47.15
            }
        },
        "BLM": {
            "name": "Saint-Barthélemy",
            "uriUE": "http://publications.europa.eu/resource/authority/country/BLM",
            "spatial": {
                "westlimit": -62.96,
                "southlimit": 17.87,
                "eastlimit": -62.78,
                "northlimit": 17.98
            }
        },
        "MAF": {
            "name": "Saint-Martin",
            "uriUE": "http://publications.europa.eu/resource/authority/country/MAF",
            "spatial": {
                "westlimit": -63.16,
                "southlimit": 18.04,
                "eastlimit": -62.97,
                "northlimit": 18.13
            }
        },
        "WLF": {
            "name": "Wallis-et-Futuna",
            "uriUE": "http://publications.europa.eu/resource/authority/country/WLF",
            "spatial": {
                "westlimit": -176.28,
                "southlimit": -14.37,
                "eastlimit": -178,
                "northlimit": -13.17
            }
        },
        "PYF": {
            "name": "Polynésie française",
            "uriUE": "http://publications.europa.eu/resource/authority/country/PYF",
            "spatial": {
                "westlimit": -154.73,
                "southlimit": -27.66,
                "eastlimit": -134.44,
                "northlimit": -7.86
            }
        },
        "NCL": {
            "name": "Nouvelle-Calédonie",
            "uriUE": "http://publications.europa.eu/resource/authority/country/NCL",
            "spatial": {
                "westlimit": 158.18,
                "southlimit": -23.03,
                "eastlimit": 168.96,
                "northlimit": -17.9
            }
        },
        "ATF": {
            "name": "Terres australes et antarctiques françaises (TAAF)",
            "uriUE": "http://publications.europa.eu/resource/authority/country/FQ0",
            "spatial": {
                "westlimit": 40.32,
                "southlimit": -50.02,
                "eastlimit": 77.6,
                "northlimit": -11.5
            }
        }
    },
    "zones-maritimes": {
        "ZM-ATF": {
            "name": "Zone maritime des Terres australes et antarctiques françaises (TAAF)",
            "spatial": {
                "westlimit": 37.54,
                "southlimit": -68.35,
                "eastlimit": 146.16,
                "northlimit": -10.64
            }
        },
        "ZM-REU": {
            "name": "Zone maritime de La Réunion",
            "spatial": {
                "westlimit": 51.8,
                "southlimit": -24.75,
                "eastlimit": 58.22,
                "northlimit": -18.31
            }
        },
        "ZM-MYT": {
            "name": "Zone maritime de Mayotte",
            "spatial": {
                "westlimit": 43.59,
                "southlimit": -14.55,
                "eastlimit": 46.74,
                "northlimit": -11.14
            }
        },
        "ZM-NCL": {
            "name": "Zone maritime de Nouvelle Calédonie",
            "spatial": {
                "westlimit": 156.05,
                "southlimit": -26.47,
                "eastlimit": 174.47,
                "northlimit": -14.78
            }
        },
        "ZM-FX-Atl": {
            "name": "métropole - zone Atlantique",
            "spatial": {
                "westlimit": -10.1,
                "southlimit": 43.25,
                "eastlimit": -0.23,
                "northlimit": 49.51
            }
        },
        "ZM-SPM": {
            "name": "Zone maritime de St Pierre et Miquelon",
            "spatial": {
                "westlimit": -57.11,
                "southlimit": 43.43,
                "eastlimit": -55.72,
                "northlimit": 47.41
            }
        },
        "ZM-MTQ": {
            "name": "Zone maritime de Martinique",
            "spatial": {
                "westlimit": -62.83,
                "southlimit": 14.06,
                "eastlimit": -56,
                "northlimit": 16.93
            }
        },
        "ZM-BLM": {
            "name": "Zone maritime de St Barthélemy",
            "spatial": {
                "westlimit": -63.07,
                "southlimit": 17.64,
                "eastlimit": -62.23,
                "northlimit": 18.31
            }
        },
        "ZM-GUF": {
            "name": "Zone maritime de Guyane",
            "spatial": {
                "westlimit": -54.55,
                "southlimit": 1.89,
                "eastlimit": -48.79,
                "northlimit": 10.3
            }
        },
        "ZM-WLF": {
            "name": "Zone maritime de Wallis + Futuna",
            "spatial": {
                "westlimit": 179.5,
                "southlimit": -15.98,
                "eastlimit": -174.16,
                "northlimit": -9.76
            }
        },
        "ZM-PYF": {
            "name": "Zone maritime de Polynésie",
            "spatial": {
                "westlimit": -158.52,
                "southlimit": -31.51,
                "eastlimit": -131.56,
                "northlimit": -4.34
            }
        },
        "ZM-GLP": {
            "name": "Zone maritime de Guadeloupe",
            "spatial": {
                "westlimit": -62.82,
                "southlimit": 15.05,
                "eastlimit": -57.58,
                "northlimit": 18.54
            }
        },
        "ZM-MAF": {
            "name": "Zone maritime de St Martin",
            "spatial": {
                "westlimit": -63.64,
                "southlimit": 17.87,
                "eastlimit": -62.75,
                "northlimit": 18.2
            }
        },
        "ZM-FX-Med": {
            "name": "métropole - zone Méditerranée",
            "spatial": {
                "westlimit": 2.53,
                "southlimit": 40.08,
                "eastlimit": 10.26,
                "northlimit": 43.87
            }
        },
        "ZM-FX-MMN": {
            "name": "métropole - zone Manche-Mer du Nord",
            "spatial": {
                "westlimit": -4.08,
                "southlimit": 48.62,
                "eastlimit": 2.55,
                "northlimit": 51.56
            }
        }
    }
}
