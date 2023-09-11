
import parse from 'json-templates';

export const swaggerTemplate = parse({
  "openapi": "3.0.0",
  "info": {
    "title": "HBF REPORT CRUD",
    "description": "Описание API запросов для получения результатов функциональных тестов для HBF",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "http://{{host}}:{{port}}/hbf/v1"
    }
  ],
  "paths": {
    "/launch": {
      "get": {
        "summary": "Получение данных из launch по uuid",
        "parameters": [
          {
            "in": "query",
            "name": "uuid",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Данные успешно получены",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/launch"
                }
              }
            }
          },
          "400": {
            "description": "Не корректный запрос",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          },
          "500": {
            "description": "Серверная ошибка",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          }
        }
      }
    },
    "/launchs": {
      "get": {
        "summary": "Получение списка лаунчей подходящих под условия",
        "parameters": [
          {
            "in": "query",
            "name": "pipeline",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "job",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "srcBranch",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "dstBranch",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "commit",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "hbfTag",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "offset",
            "required": false,
            "schema": {
              "type": "number"
            }
          },
          {
            "in": "query",
            "name": "limit",
            "required": false,
            "schema": {
              "type": "number"
            }
          },
          {
            "in": "query",
            "name": "status",
            "required": false,
            "schema": {
              "type": "string",
              "enum": [
                "create",
                "in_process",
                "finish",
                "error"
              ]
            }
          }
        ],
        "responses": {
          "200": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "totalRows": {
                      "type": "number",
                      "description": "Общее количество строк в таблице launchs подходящих под заданные условия"
                    },
                    "launchs": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/launch"
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Не корректный запрос",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          },
          "500": {
            "description": "Серверная ошибка",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          }
        }
      }
    },
    "/launch_error": {
      "get": {
        "summary": "Получение данных из launch_error по launchUuid",
        "parameters": [
          {
            "in": "query",
            "name": "launchUuid",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Данные успешно получены",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/launchError"
                }
              }
            }
          },
          "400": {
            "description": "Не корректный запрос",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          },
          "500": {
            "description": "Серверная ошибка",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          }
        }
      }
    },
    "/assertions": {
      "get": {
        "summary": "Получение данных из launch_error по launchUuid",
        "parameters": [
          {
            "in": "query",
            "name": "launchUUID",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "srcIp",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "srcPort",
            "required": false,
            "schema": {
              "type": "number"
            }
          },
          {
            "in": "query",
            "name": "dstIp",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "dstPort",
            "required": false,
            "schema": {
              "type": "number"
            }
          },
          {
            "in": "query",
            "name": "protocol",
            "required": false,
            "schema": {
              "type": "string",
              "enum": [
                "tcp",
                "udp"
              ]
            }
          },
          {
            "in": "query",
            "name": "sgFrom",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "sgTo",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "offset",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "limit",
            "required": false,
            "schema": {
              "type": "string"
            }
          },
          {
            "in": "query",
            "name": "status",
            "required": false,
            "schema": {
              "type": "string",
              "enum": [
                "pass",
                "fail"
              ]
            }
          },
          {
            "in": "query",
            "name": "msgErr",
            "required": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Данные успешно получены",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/assertion"
                }
              }
            }
          },
          "400": {
            "description": "Не корректный запрос",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          },
          "500": {
            "description": "Серверная ошибка",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/error"
                }
              }
            }
          }
        }
      }

    }
  },
  "components": {
    "schemas": {
      "launch": {
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string"
          },
          "date": {
            "type": "string"
          },
          "pipeline": {
            "type": "number"
          },
          "job": {
            "type": "number"
          },
          "src_branch": {
            "type": "string"
          },
          "dst_branch": {
            "type": "string"
          },
          "commit": {
            "type": "string"
          },
          "fail_count": {
            "type": "number"
          },
          "pass_count": {
            "type": "number"
          },
          "duration": {
            "type": "number"
          },
          "hbf_tag": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "create",
              "in_process",
              "finish",
              "error"
            ]
          }
        }
      },
      "launchError": {
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string"
          },
          "launch_uuid": {
            "type": "string"
          },
          "messgae": {
            "type": "string"
          }
        }
      },
      "assertion": {
        "type": "object",
        "properties": {
          "uuid": {
            "type": "string"
          },
          "launch_uuid": {
            "type": "string"
          },
          "src_ip": {
            "type": "string"
          },
          "src_port": {
            "type": "string"
          },
          "dst_ip": {
            "type": "string"
          },
          "dst_port": {
            "type": "string"
          },
          "protocol": {
            "type": "string",
            "enum": [
              "tcp",
              "udp"
            ]
          },
          "sg_from": {
            "type": "string"
          },
          "sg_to": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": [
              "create",
              "in_process",
              "finish",
              "error"
            ]
          },
          "msg_err": {
            "type": "string"
          }
        }
      },
      "error": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string"
          },
          "msg": {
            "oneOf": [
              {
                "type": "string"
              },
              {
                "type": "object"
              }
            ]
          }
        }
      }
    }
  }
})